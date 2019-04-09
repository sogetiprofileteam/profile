import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Consultant } from '@core/models';

import { MatDialogRef } from '@angular/material';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Skill {
  name: string;
}

export class ChipsAutocompleteExample {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = ['Teamwork'];
  allSkills: string[] = ['Communication', 'SDLC', 'Teamwork', 'UI Designer', 'UI Designer'];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
        startWith(null),
        map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add skill only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our skill
      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.skillCtrl.setValue(null);
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }
}

@Component({
  selector: 'app-consultant-skills-edit',
  templateUrl: './consultant-skills-edit.component.html',
  styleUrls: ['./consultant-skills-edit.component.scss']
})
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
