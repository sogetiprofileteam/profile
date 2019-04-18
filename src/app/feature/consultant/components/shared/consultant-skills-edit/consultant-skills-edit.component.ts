import { Component, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { tap, switchMap, map, startWith, takeUntil, mergeMap } from 'rxjs/operators';
import { Subject, forkJoin, Observable, BehaviorSubject, merge, combineLatest } from 'rxjs';

import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Skill, Consultant } from '@core/models';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ConsultantSkillDataService } from '@feature/consultant/services/consultant-skill-data/consultant-skill-data.service';

import { cloneDeep, isEqual, differenceWith } from 'lodash';

export interface SkillsEditDialogData {
  type: SkillsType
}

export interface SkillOption extends Skill {
  selected: boolean;
}

export type SkillsType = 'coreSkills' | 'technicalSkills';

@Component({
  selector: 'app-consultant-skills-edit',
  templateUrl: './consultant-skills-edit.component.html',
  styleUrls: ['./consultant-skills-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditComponent implements OnInit, OnDestroy {
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SkillsEditDialogData,
    private consultantStore: ConsultantStore,
    private consultantSkillService: ConsultantSkillDataService,
    private dialogRef: MatDialogRef<ConsultantSkillsEditComponent>,
  ) { }

  skillType: SkillsType = this.data.type;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();

  filteredAvailableSkills$ = this.skillCtrl.valueChanges.pipe(
    startWith(null),
    // This could be a string or Skill because the mat-chip value is the Skill object itself,
    // so when one selects or enters a skill the inputbox valueChanges could emit a string or 
    // Skill object. This isn't as clean as I'd like it to be.
    mergeMap((value: string | Skill) => {
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

  destroy$ = new Subject();
  consultant$ =
    this.consultantStore.consultant$
      .pipe(
        tap(c => this._selectedSkills$.next(c[this.skillType]))
      );

  getSkills$ =
    this.skillType === 'coreSkills'
      ? this.consultantSkillService.getCoreSkills().pipe(takeUntil(this.destroy$))
      : this.consultantSkillService.getTechnicalSkills().pipe(takeUntil(this.destroy$))

  private _selectedSkills$: BehaviorSubject<Skill[]> = new BehaviorSubject(null);
  selectedSkills$ = this._selectedSkills$.asObservable();
  get selectedSkills(): Skill[] {
    return this._selectedSkills$.value;
  }

  availableSkills$: Observable<SkillOption[]> =
    combineLatest(this.selectedSkills$, this.getSkills$)
      .pipe(
        map(([selectedSkills, availableSkills]) => {
          return this.buildAvailableSkillsOptions(selectedSkills, availableSkills);
        }),
        tap(s => console.log(s)),
      )

  private buildAvailableSkillsOptions(selectedSkills: Skill[], availableSkills: Skill[]) {
    const selectedSkillsOptions = selectedSkills.map(skill => {
      const selectedSkill: SkillOption = {
        ...cloneDeep(skill),
        selected: true
      };
      return selectedSkill;
    });

    const unselectedSkills: Skill[] = differenceWith(availableSkills, selectedSkills, isEqual);
    const unselectedSkillsOptions = unselectedSkills.map(skill => {
      const selectedSkill: SkillOption = {
        ...cloneDeep(skill),
        selected: false
      };
      return selectedSkill;
    });

    const availableSkillsOptions: SkillOption[] = [
      ...selectedSkillsOptions,
      ...unselectedSkillsOptions
    ];

    return availableSkillsOptions;
  }

  ngOnInit() {
    
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
        const skill: Skill = {
          name: name,
          id: null
        }
        this._selectedSkills$.next([...cloneDeep(this.selectedSkills), skill]);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove(skill: Skill): void {
    const index = this.selectedSkills.indexOf(skill);

    if (index >= 0) {
      const skillsCopy = cloneDeep(this.selectedSkills);
      const skillsWithoutRemoved =  skillsCopy.splice(index, 1);
      this._selectedSkills$.next([...skillsWithoutRemoved]);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this._selectedSkills$.next([...this.selectedSkills, event.option.value])
    this.skillCtrl.setValue(null);
    this.skillInput.nativeElement.value = '';
  }

  private filterSkills(name: string): Observable<Skill[]> {
    const filterName = name.toLowerCase();
    return this.availableSkills$
      .pipe(
        map(skills => skills.filter(skill => skill.name.toLowerCase().indexOf(filterName) === 0))
      );
  }

  updateConsultant() {
    // New skills here means skills that don't exist in availableSkills;
    // skills that are entered via the free text input.
    const newSkillsExist = this.selectedSkills.find(skill => skill.id === null);

    if (newSkillsExist) {
      this.updateWithNewSkills();
    } else {
      // Existing skills here means skills that are in availableSkills, 
      // not necessarily skills that were already in the consultant object
      this.updateWithExistingSkills();
    }
  }

  private updateWithNewSkills() {
    // Existing skills here means skills that are in availableSkills, 
    // not necessarily skills that were already in the consultant object
    const existingSkills = this.selectedSkills.filter(skill => skill.id !== null);
    const newSkills = this.selectedSkills.filter(skill => skill.id === null);
    const newSkillRequests = newSkills.map(skill => this.consultantSkillService.addNewSkill(skill.name));

    forkJoin(...newSkillRequests)
      .pipe(switchMap((responseSkills: Skill[]) => {
        const skills = [
          ...responseSkills,
          ...existingSkills
        ]

        return this.updateSkills(skills);
      }))
      .subscribe(() => this.close());
  }

  private updateWithExistingSkills() {
    this.updateSkills(this.selectedSkills)
      .subscribe(() => this.close());
  }

  private updateSkills(skills: Skill[]) {
    return this.consultantStore
      .updateConsultant({ [this.skillType]: skills })
      .pipe(takeUntil(this.destroy$))
  }

}
