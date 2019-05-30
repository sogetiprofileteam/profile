import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Consultant } from '@core/models';

@Component({
  selector: 'app-consultant-education-certifications-edit',
  templateUrl: './consultant-education-certifications-edit.component.html',
  styleUrls: ['./consultant-education-certifications-edit.component.scss']
})
export class ConsultantEducationCertificationsEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantEducationCertificationsEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  educationCertificationForm = this.formBuilder.group({
    school: ['', Validators.required],
    levelOfDegree: ['', Validators.required],
    shortDate: [''],
  });

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.educationCertificationForm.patchValue(consultant)));
  destroy$ = new Subject();

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.educationCertificationForm.valid) {
      const updatedData = this.getFormData();

      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  getFormData(): Partial<Consultant> {
    return this.educationCertificationForm.value as Partial<Consultant>;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
