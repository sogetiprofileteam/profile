import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Consultant } from '@core/models';

@Component({
  templateUrl: 'summary-edit.component.html',
  styleUrls: ['summary-edit.component.scss']
})
export class SummaryEditComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<SummaryEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  summaryForm = this.formBuilder.group({
    summary: ['', Validators.required],
  });

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.summaryForm.patchValue(consultant)));
  destroy$ = new Subject();

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.summaryForm.valid) {
      const updatedData = this.getFormData();

      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  getFormData(): Partial<Consultant> {
    return this.summaryForm.value as Partial<Consultant>;
  }
}
