import { Component, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { tap, switchMap, map, startWith, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Skill } from '@core/models';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ConsultantSkillDataService } from '@feature/consultant/services/consultant-skill-data/consultant-skill-data.service';

export interface SkillsEditDialogData {
  type: SkillsType
}

export type SkillsType = 'coreSkills' | 'technicalSkills';

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
  ) {
    this.skillType = this.data.type;
  }

  skillType: SkillsType
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();

  selectedSkills: Skill[];
  filteredAvailableSkills = this.skillCtrl.valueChanges.pipe(
    startWith(null),
    map((value: string | Skill) => {
      if (value) {
        let name: string;

        if (typeof value !== 'string' ) {
          name = value.name;
        } else {
          name = value;
        }
  
        return this.filterSkills(name);
      } else {
        return this.availableSkills;
      }
    })
  );
  // TODO: Dynamically load available core or technical skills
  availableSkills: Skill[] = [
    {
      id: '1',
      name: 'Software development'
    },
    {
      id: '2',
      name: 'Time management'
    },
    {
      id: '3',
      name: 'Prioritizing'
    },
    {
      id: '4',
      name: 'Communication',
    },
    {
      id: '5',
      name: 'SDLC',
    },
    {
      id: '7',
      name: 'Teamwork',
    },
    {
      id: '8',
      name: 'UI Designer',
    },
    {
      id: '9',
      name: 'UX Designer'
    },
  ];

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.selectedSkills = consultant[this.skillType]));
  destroy$ = new Subject();

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
        this.selectedSkills.push(skill);
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
      this.selectedSkills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkills.push(event.option.value);
    this.skillCtrl.setValue(null);
    this.skillInput.nativeElement.value = '';
  }

  private filterSkills(name: string): Skill[] {
    const filterName = name.toLowerCase();
    return this.availableSkills.filter(skill => skill.name.toLowerCase().indexOf(filterName) === 0);
  }

  updateConsultant() {
    // New skills here means skills that don't exist in availableSkills;
    // skills that are entered via the free text input.
    const newSkillsExist = this.selectedSkills.find(skill => skill.id === null);

    if (newSkillsExist) {
      this.updateWithNewSkills();
    } else {
      // Existing skills here means skills that are in availableSkills, 
      // not necessarily skills that were already in the consutlant object
      this.updateWithExistingSkills();
    }
  }

  private updateWithNewSkills() {
    // Existing skills here means skills that are in availableSkills, 
    // not necessarily skills that were already in the consutlant object
    const existingSkills = this.selectedSkills.filter(skill => skill.id !== null);
    const newSkills = this.selectedSkills.filter(skill => skill.id === null);
    const newSkillRequests = newSkills.map(skill => this.consultantSkillService.addNewSkill(skill.name));
    
    forkJoin(...newSkillRequests)
      .pipe(switchMap(responseSkills => {
        // For concept purposes only, mockResponseSkills should be responseSkills when the 
        // addNewSkill call actually returns the new skill. Making random ID's to mock response.
        const mockResponseSkills = newSkills.map(skill => {
          skill.id = Math.floor((Math.random() * 100)).toString()
          return skill;
        })
        const skills = [
          ...mockResponseSkills,
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
