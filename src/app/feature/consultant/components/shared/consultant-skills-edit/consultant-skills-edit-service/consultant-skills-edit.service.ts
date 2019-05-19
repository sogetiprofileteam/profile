import { Injectable, OnDestroy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Subject, combineLatest, Observable, forkJoin, ReplaySubject } from 'rxjs';
import { tap, takeUntil, map, switchMap } from 'rxjs/operators';

import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
  MatChip,
  MatAutocomplete
} from '@angular/material';

import { differenceWith, isEqual, pick, merge } from 'lodash';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';
import { SkillsDataService } from '@feature/consultant/services/skills-data/skills-data.service';

import {
  SelectedSkill,
  Skill,
  SkillType,
  SkillOption
} from '@core/models';

import { dynamicSort } from '@shared/helpers/dynamic-sort';

@Injectable()
export class ConsultantSkillsEditService implements OnDestroy {
  readonly maxDisplaySkills = 10;

  private displaySkills: SelectedSkill[];
  private skillProperty: string;
  private skillType: SkillType;
  private selectedSkills: SelectedSkill[];

  private _closeDialog$ = new Subject();
  private _selectedSkills$ = new ReplaySubject<SelectedSkill[]>(1);
  private _destroy$ = new Subject();
  private _getSkills$: Observable<Skill[]>;

  availableSkills$: Observable<SkillOption[]>;

  closeDialog$ = this._closeDialog$.asObservable();

  consultant$ =
    this.consultantStore.consultant$
      .pipe(tap(consultant => this._selectedSkills$.next(consultant[this.skillProperty])));

  selectedSkills$ =
    this._selectedSkills$.asObservable()
      .pipe(
        map(skills => skills.sort(dynamicSort('name'))),
        tap(skills => this.selectedSkills = skills)
      );

  // Skills that the user selects to be displayed on their profile.
  displaySkills$ =
    this.selectedSkills$
      .pipe(
        map(skills => filterSortDisplaySkills(skills)),
        tap(skills => this.displaySkills = skills)
      );

  private get displaySkillsCount() {
    return this.selectedSkills.filter(skill => skill.display === true).length;
  }

  constructor(
    private consultantStore: ConsultantStore,
    private skillService: SkillsDataService,
  ) { }

  ngOnDestroy() {
    this._destroy$.next();
  }

  init(skillType: SkillType, propertyName: string) {
    this.skillType = skillType;
    this._getSkills$ = this.skillService.getSkills(skillType).pipe(takeUntil(this._destroy$));
    this.skillProperty = propertyName;

    this.availableSkills$ =
      combineLatest(this.selectedSkills$, this._getSkills$)
        .pipe(
          // We need to know which skills are in the selectedSkills Observable so we can
          // disable them in the dropdown options to prevent duplicates.
          map(([selectedSkills, availableSkills]) => {
            return this.buildSkillOptions(selectedSkills, availableSkills);
          })
        );
  }

  filterSkills(name: string): Observable<SkillOption[]> {
    const filterName = name.toLowerCase();
    return this.availableSkills$
      .pipe(
        map(skills => skills.filter(skill => skill.name.toLowerCase().indexOf(filterName) === 0))
      );
  }

  private buildSkillOptions(selectedSkills: SelectedSkill[], availableSkills: Skill[]): SkillOption[] {
    const selectedSkillsOptions = this.createSelectedOptions(selectedSkills);

    // Similar to above but we get the items that aren't inside the selectedSkills array
    // Lodash's differenceWith() and isEqual() are a godsend here
    const pickedSelectedSkills = selectedSkills.map(skill => this.pickSkill(skill));
    const unselectedSkills: SelectedSkill[] = differenceWith(availableSkills, pickedSelectedSkills, isEqual);
    const unselectedSkillsOptions = this.createUnselectedOptions(unselectedSkills);

    const availableSkillsOptions: SkillOption[] = [
      ...selectedSkillsOptions,
      ...unselectedSkillsOptions
    ];

    return availableSkillsOptions.sort(dynamicSort('name'))  ;
  }

  private createSelectedOptions(selectedSkills: SelectedSkill[]): SkillOption[] {
    // Add the selected boolean to selectedSkills, ignore skills with null ID because those
    // were entered via freetext and shouldn't be added to the avialableSkills until added to DB
    // which happens on save.
    return selectedSkills.map(skill => {
      const pickedSkill = this.pickSkill(skill);
      const selectedSkill: SkillOption = {
        ...pickedSkill,
        selected: true
      };
      return selectedSkill;
    }).filter(skill => skill.id !== null);
  }

  private createUnselectedOptions(unselectedSkills: SelectedSkill[]): SkillOption[] {
    return unselectedSkills.map(skill => {
      const selectedSkill: SkillOption = {
        ...skill,
        selected: false
      };
      return selectedSkill;
    });
  }

  private pickSkill(skill: SelectedSkill): Skill {
    return pick(skill, ['id', 'name', 'type']) as Skill;
  }

  addSkill(event: MatAutocompleteSelectedEvent, control: FormControl, input: ElementRef<HTMLInputElement>): void {
    // Need to strip the selected property from a selected option so that
    // we don't accidentally duplicate the option in the availableSkills$ observable
    const newSkill: SelectedSkill = {
      ...this.pickSkill(event.option.value),
      display: false,
      displayOrder: null
    };

    this._selectedSkills$.next([...this.selectedSkills, newSkill]);
    control.setValue(null);
    input.nativeElement.value = '';
  }

  addNewSkill(event: MatChipInputEvent, autocomplete: MatAutocomplete): void {
    // Add skill only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!autocomplete.isOpen) {
      const input = event.input;
      const skillName = event.value.trim();

      // Add new skill
      if (skillName) {
        const skill: SelectedSkill = {
          name: skillName,
          id: null,
          display: false,
          displayOrder: null,
          type: this.skillType,
        };
        this._selectedSkills$.next([...this.selectedSkills, skill]);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  removeSkill(skill: SelectedSkill): void {
    const index = this.selectedSkills.indexOf(skill);

    if (index >= 0) {
      const skillsCopy = [...this.selectedSkills];
      skillsCopy.splice(index, 1);
      this._selectedSkills$.next([...skillsCopy]);
    }
  }

  updateConsultant(): void {
    // New skills here means skills that don't exist in availableSkills;
    // skills that are entered via the free text input.
    const newSkillsExist = this.selectedSkills.some(skill => skill.id === null);

    if (newSkillsExist) {
      this.updateWithNewSkills();
    } else {
      this.updateWithExistingSkills();
    }
  }

  private updateWithNewSkills(): void {
    const existingSkills = this.selectedSkills.filter(skill => skill.id !== null);
    const newSkills = this.selectedSkills.filter(skill => skill.id === null);
    const newSkillRequests = newSkills.map(skill => this.skillService.addNewSkill(skill.name, this.skillType));

    forkJoin(newSkillRequests)
      .pipe(
        switchMap((responseSkills: Skill[]) => {
          // Merge so that we get the display property and proper ID from the server
          const mergedResponseNewSkills: SelectedSkill[] = merge(newSkills, responseSkills);

          const skills: SelectedSkill[] = [
            ...mergedResponseNewSkills,
            ...existingSkills
          ];

          return this.updateSkills(skills);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this._closeDialog$.next());
  }

  private updateWithExistingSkills(): void {
    this.updateSkills(this.selectedSkills)
      .subscribe(() => this._closeDialog$.next());
  }

  private updateSkills(skills: SelectedSkill[]) {
    return this.consultantStore
      .updateConsultant({ [this.skillProperty]: skills })
      .pipe(takeUntil(this._destroy$));
  }

  chipClicked(chip: MatChip): void {
    const previouslySelected = chip.selected;
    const selectedSkill: SelectedSkill = chip.value;

    if (previouslySelected) {
      this.removeOneFromDisplaySkills(chip, selectedSkill);
    } else {
      this.addOneToDisplaySkills(chip, selectedSkill);
    }
  }

  private addOneToDisplaySkills(chip: MatChip, skill: SelectedSkill): void {
    this.updateDisplayOfSelectedSkill(chip, skill, true);
  }

  private removeOneFromDisplaySkills(chip: MatChip, skill: SelectedSkill): void {
    this.updateDisplayOfSelectedSkill(chip, skill, false);
  }

  private updateDisplayOfSelectedSkill(chip: MatChip, skill: SelectedSkill, displayVal: boolean): void {
    const updateIndex = this.selectedSkills.indexOf(skill);
    const selectedSkillsWithoutUpdatedSkill = this.selectedSkills.filter((existingSkill, currIndex) => currIndex !== updateIndex);

    const updatedSkill: SelectedSkill = {
      ...skill,
      display: displayVal
    };

    if (displayVal) {
      if (this.displaySkillsCount < this.maxDisplaySkills) {
        chip.toggleSelected();
        updatedSkill.displayOrder = this.displaySkillsCount + 1;
        this.updateSelectedDisplaySkills(selectedSkillsWithoutUpdatedSkill, updatedSkill);
      } else {
        // Need to replace with UI alert, probably a snackbar
        console.warn('You are trying to add too many display skills');
      }
    } else {
      chip.toggleSelected();
      const selectedSkillsUpdated = this.reorderSkillsAfterRemovedSkill(selectedSkillsWithoutUpdatedSkill, updatedSkill.displayOrder);

      updatedSkill.displayOrder = 0;
      this.updateSelectedDisplaySkills(selectedSkillsUpdated, updatedSkill);
    }
  }

  private reorderSkillsAfterRemovedSkill(selectedSkillsWithoutUpdated: SelectedSkill[], updatedSkillDisplayOrder: number) {
    return selectedSkillsWithoutUpdated.map(selectedSkill => {
      if (selectedSkill.displayOrder > updatedSkillDisplayOrder) {
        const reOrderedSkill: SelectedSkill = {
          ...selectedSkill,
          displayOrder: selectedSkill.displayOrder - 1
        };
        return reOrderedSkill;
      } else {
        return selectedSkill;
      }
    });
  }

  private updateSelectedDisplaySkills(selectedSkillsClone: SelectedSkill[], updatedSkill: SelectedSkill) {
    const updatedSelectedSkills: SelectedSkill[] = [
      ...selectedSkillsClone,
      updatedSkill
    ];
    this._selectedSkills$.next(updatedSelectedSkills);
  }

  displaySkillReordered(event: CdkDragDrop<SelectedSkill[]>) {
    const displaySkillsClone = [
      ...this.displaySkills
    ];
    moveItemInArray(displaySkillsClone, event.previousIndex, event.currentIndex);

    for (let index = 0; index < displaySkillsClone.length; index++) {
      displaySkillsClone[index].displayOrder = index + 1;
    }

    const selectedSkillsNoDisplay = this.selectedSkills.filter(skill => skill.display === false);
    const reorderedSelectedSkills = [
      ...selectedSkillsNoDisplay,
      ...displaySkillsClone
    ];

    this._selectedSkills$.next(reorderedSelectedSkills);
  }
}
