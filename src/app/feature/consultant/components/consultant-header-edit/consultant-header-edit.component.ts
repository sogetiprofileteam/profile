import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Consultant } from '@core/models';

@Component({
  templateUrl: 'consultant-header-edit.component.html',
  styleUrls: ['consultant-header-edit.component.scss']
})
export class ConsultantHeaderEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantHeaderEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  headerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    urlLinkedIn: [''],
    urlGitHub: [''],
    urlWordpress: [''],
    urlPersonal: [''],
  });

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.headerForm.patchValue(consultant)));
  destroy$ = new Subject();

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.headerForm.valid) {
      const updatedData = this.getFormData();

      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  getFormData(): Partial<Consultant> {
    return this.headerForm.value as Partial<Consultant>;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
