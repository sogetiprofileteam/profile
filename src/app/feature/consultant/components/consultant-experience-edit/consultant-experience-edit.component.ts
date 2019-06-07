import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Consultant } from '@core/models';

@Component({
  selector: 'app-consultant-experience-edit',
  templateUrl: './consultant-experience-edit.component.html',
  styleUrls: ['./consultant-experience-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantExperienceEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  readonly urlPattern = new RegExp('^(http|https)://');
  readonly phonePattern = new RegExp('^\\d+$');

  // experienceForm = this.formBuilder.group({
  //   companyName: ['', Validators.required],
  //   lastName: ['', Validators.required],
  //   email: ['', [Validators.required, Validators.email]],
  //   phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
  //   urlLinkedIn: ['', Validators.pattern(this.urlPattern)],
  //   urlGitHub: ['', Validators.pattern(this.urlPattern)],
  //   urlWordpress: ['', Validators.pattern(this.urlPattern)],
  //   urlPersonal: ['', Validators.pattern(this.urlPattern)],
  // });

  experienceForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    descriptions: ['', [Validators.required]]
  })



  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.experienceForm.patchValue(consultant)));
  destroy$ = new Subject();

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.experienceForm.valid) {
      const updatedData = this.getFormData();

      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  getFormData(): Partial<Consultant> {
    return this.experienceForm.value as Partial<Consultant>;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get companyName(){
    return this.experienceForm.get('companyName');
  }

  get title(){
    return this.experienceForm.get('title');
  }

  get startDate(){
    return this.experienceForm.get('startDate');
  }

  get endDate(){
    return this.experienceForm.get('endtDate');
  }

  get descriptions(){
    return this.experienceForm.get('descriptions');
  }
}


