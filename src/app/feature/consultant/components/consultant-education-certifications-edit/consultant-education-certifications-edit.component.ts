import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Certification, Education } from '@core/models';

@Component({
  selector: 'app-consultant-education-certifications-edit',
  templateUrl: './consultant-education-certifications-edit.component.html',
  styleUrls: ['./consultant-education-certifications-edit.component.scss']
})
export class ConsultantEducationCertificationsEditComponents implements OnDestroy {

  private certificationArray = [];
  private educationArray = [];

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantEducationCertificationsEditComponents>,
    private formBuilder: FormBuilder
  ) { }

  educationCertificationForm = this.formBuilder.group({
    school: ['', Validators.required],
    levelOfDegree: ['', Validators.required],
    endDate: [''],
    eduOrCert: ['1']
  });

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.educationCertificationForm.patchValue(consultant)));
  destroy$ = new Subject();

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.educationCertificationForm.valid) {
      const updatedData = this.getFormData();

      if (updatedData.eduOrCert === '1') {
        var education = {
          levelOfDegree: updatedData.levelOfDegree,
          school: updatedData.school,
          //database doesnt like school being a string for the moment.
          endDate: updatedData.endDate
        }
        this.educationArray.push(education);
        updatedData.education = [...this.educationArray];
      } else {
        var certification = {
          dateRecieved: updatedData.endDate,
          name: updatedData.school,
          //database doesnt support this yet so keep it out for now
          //title: updatedData.title
        }
        this.certificationArray.push(certification);
        updatedData.certifications = [...this.certificationArray];
      }
      console.log("updateddata", updatedData)
      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  addEduCert(): void {

  }

  getFormData() {
    return this.educationCertificationForm.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
