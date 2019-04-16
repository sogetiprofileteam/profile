import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { tap, switchMap, map, startWith, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Skill } from '@core/models';

import { MatDialogRef } from '@angular/material';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';

import { ConsultantSkillDataService } from '@feature/consultant/services/consultant-skill-data/consultant-skill-data.service';



@Component({
  selector: 'app-consultant-skills-edit',
  templateUrl: './consultant-skills-edit.component.html',
  styleUrls: ['./consultant-skills-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditComponent implements OnDestroy {
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

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

  constructor(
    private consultantStore: ConsultantStore,
    private consultantSkillService: ConsultantSkillDataService,
    private dialogRef: MatDialogRef<ConsultantSkillsEditComponent>,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
  }

  // TODO: dynamically choose coreSkills or technicalSkills
  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.selectedSkills = consultant.coreSkills));
  destroy$ = new Subject();
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
    const newSkills = this.selectedSkills.filter(skill => skill.id === null);

    if (newSkills) {
      this.updateWithNewSkills(newSkills);
    } else {
      this.updateSkills(this.selectedSkills)
        .subscribe(() => this.close())
    }
  }

  private updateWithNewSkills(newSkills: Skill[]) {
    const newSkillRequests = newSkills.map(skill => this.consultantSkillService.addNewSkill(skill.name));
    forkJoin(...newSkillRequests)
      .pipe(switchMap(responseSkills => {
        // For concept purposes only, this should be responseSkills when the 
        // addNewSkill call actually returns the new skill
        return this.updateSkills(this.selectedSkills);
      }))
      .subscribe(() => this.close());
  }

  private updateSkills(skills: Skill[]) {
    return this.consultantStore
      .updateConsultant({ coreSkills: skills })
      .pipe(takeUntil(this.destroy$))
  }

}
