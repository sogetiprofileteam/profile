import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material/dialog';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { NotificationsService } from '@core/services/notifications/notifications.service';
import { Consultant } from '@core/models';

@Component({
  templateUrl: 'consultant-header-edit.component.html',
  styleUrls: ['consultant-header-edit.component.scss']
})
export class ConsultantHeaderEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private notification: NotificationsService,
    private dialogRef: MatDialogRef<ConsultantHeaderEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  readonly urlPattern = new RegExp('^(http|https)://');
  readonly phonePattern = new RegExp('^\\d+$');

  headerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    title: ['', Validators.required],
    practice: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    urlLinkedIn: ['', Validators.pattern(this.urlPattern)],
    urlGitHub: ['', Validators.pattern(this.urlPattern)],
    urlWordpress: ['', Validators.pattern(this.urlPattern)],
    urlPersonal: ['', Validators.pattern(this.urlPattern)],
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
        .subscribe(() => this.close(), () => this.notification.notificationsBar('There was an error updating consultant', 'error'), () => this.notification.notificationsBar('Consultant Updated', 'success'));

      }
  }

  getFormData(): Partial<Consultant> {
    return this.headerForm.value as Partial<Consultant>;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
  get title() {
    return this.headerForm.get('title');
  }

  get practice() {
    return this.headerForm.get('practice');
  }

  get email() {
    return this.headerForm.get('email');
  }

  get phone() {
    return this.headerForm.get('phone');
  }

  get linkedIn() {
    return this.headerForm.get('urlLinkedIn');
  }

  get gitHub() {
    return this.headerForm.get('urlGitHub');
  }

  get wordpress() {
    return this.headerForm.get('urlWordpress');
  }

  get personal() {
    return this.headerForm.get('urlPersonal');
  }
}
