import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Consultant } from '@core/models';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-consultant-skills-edit',
  templateUrl: './consultant-skills-edit.component.html',
  styleUrls: ['./consultant-skills-edit.component.scss']
})
export class ConsultantSkillsEditComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantSkillsEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  skillsForm = this.formBuilder.group({
    search: ['Search for skills (ex: HTML)', Validators.required],
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

  ngOnInit() {
  }

}
