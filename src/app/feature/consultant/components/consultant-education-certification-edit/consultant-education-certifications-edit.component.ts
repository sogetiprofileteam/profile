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
export class ConsultantEducationCertificationsEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantEducationCertificationsEditComponent>,
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
			
			if(updatedData.eduOrCert === '1'){
				//need to get education
				var education: Education = {
					levelOfDegree: updatedData.levelOfDegree,
					school: updatedData.school,
					endDate: updatedData.endDate
				}
				updatedData.education = [];
				updatedData.education.push(education);
			} else {
				//need to get cert
				var certification: Certification = {
					dateRecieved: updatedData.endDate,
					name: updatedData.school,
					//database doesnt support this yet so keep it out for now
					// title: updatedData.title
				}
				updatedData.certifications = [];
				updatedData.certifications.push();
			}
			console.log("updateddata", updatedData)
      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  getFormData(){
    return this.educationCertificationForm.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
