import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { NotificationsService } from '@core/services/notifications/notifications.service';
import { Consultant } from '@core/models';

@Component({
  templateUrl: 'consultant-summary-edit.component.html',
  styleUrls: ['consultant-summary-edit.component.scss']
})
export class ConsultantSummaryEditComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private notification: NotificationsService,
    private dialogRef: MatDialogRef<ConsultantSummaryEditComponent>,
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
        this.notification.openSummaryUpdatedSnackBar();
    }
    else {
      this.close();
      this.notification.openErrorUpdatingSummarySnackBar();
  }

  }

  getFormData(): Partial<Consultant> {
    return this.summaryForm.value as Partial<Consultant>;
  }
}
