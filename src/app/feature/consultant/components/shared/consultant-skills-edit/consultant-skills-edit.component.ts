import { Component, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { tap, switchMap, map, startWith, takeUntil, mergeMap } from 'rxjs/operators';
import { Subject, forkJoin, Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA, MatChip } from '@angular/material';

import { Skill, SelectedSkill, SkillType, SKILL_CORE } from '@core/models';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ConsultantSkillDataService } from '@feature/consultant/services/consultant-skill-data/consultant-skill-data.service';

import { isEqual, differenceWith, merge, pick } from 'lodash';

import { dynamicSort } from '@shared/functions/dynamic-sort'

export interface SkillsEditDialogData {
  type: SkillType
}

export interface SkillOption extends Skill {
  selected: boolean;
}

@Component({
  selector: 'app-consultant-skills-edit',
  templateUrl: './consultant-skills-edit.component.html',
  styleUrls: ['./consultant-skills-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditComponent implements OnDestroy {
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SkillsEditDialogData,
    private consultantStore: ConsultantStore,
    private consultantSkillService: ConsultantSkillDataService,
    private dialogRef: MatDialogRef<ConsultantSkillsEditComponent>,
  ) { }

  skillType: SkillType = this.data.type;
  // Could probably figure out a way to do this without the magic string but this works
  skillProperty = this.skillType === SKILL_CORE ? 'coreSkills' : 'technicalSkills';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();

  destroy$ = new Subject();
  consultant$ =
    this.consultantStore.consultant$
      .pipe(tap(consultant => this._selectedSkills$.next(consultant[this.skillProperty])));

  getSkills$ =
    this.skillType === SKILL_CORE
      ? this.consultantSkillService.getCoreSkills().pipe(takeUntil(this.destroy$))
      : this.consultantSkillService.getTechnicalSkills().pipe(takeUntil(this.destroy$));

  // _selectedSkills$ is BehaviorSubject because we want to be able to manipulate
  // skills as the user interacts with the application. If it were a basic Observable 
  // then we couldn't manipulate the skills over time. 
  private _selectedSkills$: BehaviorSubject<SelectedSkill[]> = new BehaviorSubject(null);
  
  // We want to watch for changes in the _selectedSkills$ BehaviorSubject hence turning
  // it into an Observable stream.
  selectedSkills$ = 
    this._selectedSkills$.asObservable()
      .pipe(map(skills => skills.sort(dynamicSort('name'))));
  
  // We need to access the currently selectedSkills when using .next() on the _selectedSkills$
  // BehaviorSubject because we can't just push new values into an array, we have to .next() and
  // entire array. This will often be used in conjunction with the spread operator `...` to copy 
  // the values.
  private get selectedSkills(): SelectedSkill[] {
    return this._selectedSkills$.value;
  }

  // Skills that the user selects to be displayed on their profile.
  displaySkills$ = 
    this.selectedSkills$
      .pipe(
        map(skills => skills.filter(skill => skill.display === true))
      );

  availableSkills$ =
    combineLatest(this.selectedSkills$, this.getSkills$)
      .pipe(
        // We need to know which skills are in the selectedSkills Observable so we can
        // disable them in the dropdown options to prevent duplicates.
        map(([selectedSkills, availableSkills]) => {
          return this.buildAvailableOptions(selectedSkills, availableSkills);
        })
      );

  filteredAvailableSkills$ = 
    this.skillCtrl.valueChanges
      .pipe(
        startWith(null),
        // This could be a string or Skill because the mat-chip value is the Skill object itself,
        // so when one selects or enters a skill the inputbox valueChanges could emit a string or 
        // Skill object. This isn't as clean as I'd like it to be.
        mergeMap((value: string | SkillOption) => {
          if (value) {
            let name: string;
    
            if (typeof value !== 'string') {
              name = value.name;
            } else {
              name = value;
            }
    
            return this.filterSkills(name);
          } else {
            return this.availableSkills$;
          }
        })
      );  
  
  private filterSkills(name: string): Observable<SkillOption[]> {
    const filterName = name.toLowerCase();
    return this.availableSkills$
      .pipe(
        map(skills => skills.filter(skill => skill.name.toLowerCase().indexOf(filterName) === 0))
      );
  }

  private buildAvailableOptions(selectedSkills: SelectedSkill[], availableSkills: Skill[]): SkillOption[] {
    const selectedSkillsOptions = this.createSelectedOptions(selectedSkills);

    // Similar to above but we get the items that aren't inside the selectedSkills array
    // Lodash's differenceWith() and isEqual() are a godsend here
    const pickedSelectedSkills = selectedSkills.map(skill => this.pickSkillFromSelectedSkill(skill));
    const unselectedSkills: SelectedSkill[] = differenceWith(availableSkills, pickedSelectedSkills, isEqual);
    const unselectedSkillsOptions = this.createUnselectedOptions(unselectedSkills);

    // Merge all options (might be able to use Lodash's merge() function)
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
      const pickedSkill = this.pickSkillFromSelectedSkill(skill)
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

  private pickSkillFromSelectedSkill(skill: SelectedSkill): Skill {
    return pick(skill, ['id', 'name', 'type']) as Skill;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  close(): void {
    this.dialogRef.close();
  }

  addNewSkill(event: MatChipInputEvent): void {
    // Add skill only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const name = event.value.trim();

      // Add new skill
      if (name) {
        const skill: SelectedSkill = {
          name: name,
          id: null,
          display: false,
          type: this.skillType
        }
        this._selectedSkills$.next([...this.selectedSkills, skill]);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove(skill: SelectedSkill): void {
    const index = this.selectedSkills.indexOf(skill);

    if (index >= 0) {
      const skillsCopy = [...this.selectedSkills];
      skillsCopy.splice(index, 1)
      this._selectedSkills$.next([...skillsCopy]);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // Need to strip the selected property from a selected option so that
    // we don't accidentally duplicate the option in the availableSkills$ observable
    const newSkill: SelectedSkill = pick(event.option.value, ['id', 'name', 'display', 'type'])

    this._selectedSkills$.next([...this.selectedSkills, newSkill])
    this.skillCtrl.setValue(null);
    this.skillInput.nativeElement.value = '';
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
    const newSkillRequests = newSkills.map(skill => this.consultantSkillService.addNewSkill(skill.name, this.skillType));

    forkJoin(...newSkillRequests)
      .pipe(
        switchMap((responseSkills: Skill[]) => {
          // Merge so that we get the display property and proper ID from the server
          const mergedResponseNewSkills: SelectedSkill[] = merge(newSkills, responseSkills);

          const skills: SelectedSkill[] = [
            ...mergedResponseNewSkills,
            ...existingSkills 
          ]

          return this.updateSkills(skills);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.close());
  }

  private updateWithExistingSkills(): void {
    this.updateSkills(this.selectedSkills)
      .subscribe(() => this.close());
  }

  private updateSkills(skills: SelectedSkill[]) {
    return this.consultantStore
      .updateConsultant({ [this.skillProperty]: skills })
      .pipe(takeUntil(this.destroy$))
  }

  toggleChipSelection(chip: MatChip): void {
    const previouslySelected = chip.selected;
    chip.toggleSelected();

    const selectedSkill: SelectedSkill = chip.value;
     
    if (previouslySelected) {
      this.removeOneFromDisplaySkills(selectedSkill);
    } else {
      this.addOneToDisplaySkills(selectedSkill);
    }
  }

  private addOneToDisplaySkills(skill: SelectedSkill): void {
    this.updateDisplayOfSelectedSkill(skill, true);
  }

  private removeOneFromDisplaySkills(skill: SelectedSkill): void {
    this.updateDisplayOfSelectedSkill(skill, false);
  }

  private updateDisplayOfSelectedSkill(skill: SelectedSkill, display: boolean): void {
    const selectedSkillsClone = this.selectedSkills.filter(existingSkill => !isEqual(existingSkill, skill));
    const updatedSkill: SelectedSkill = {
      ...skill,
      display: display
    };

    const updatedSelectedSkills: SelectedSkill[] = [
      ...selectedSkillsClone,
      updatedSkill
    ];

    this._selectedSkills$.next(updatedSelectedSkills);
  }
}
