import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Consultant } from '@core/models';

import { MatDialogRef } from '@angular/material';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-consultant-skills-edit',
  templateUrl: './consultant-skills-edit.component.html',
  styleUrls: ['./consultant-skills-edit.component.scss']
})

export class ChipsInput {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skill: Skill[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our skill
    if ((value || '').trim()) {
      this.skill.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Skill): void {
    const index = this.skill.indexOf(fruit);

    if (index >= 0) {
      this.skill.splice(index, 1);
    }
  }
}

export class ConsultantSkillsEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantSkillsEditComponent>,
    private formBuilder: FormBuilder,
  ) { }

  skillsForm = this.formBuilder.group({
    search: ['', ],
  });

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.skillsForm.patchValue(consultant)));
  destroy$ = new Subject();

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.skillsForm.valid) {
      const updatedData = this.getFormData();

      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  getFormData(): Partial<Consultant> {
    return this.skillsForm.value as Partial<Consultant>;
  }

  ngOnDestroy() {
  }

}
