import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef, MatExpansionPanel } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Certification, Education } from '@core/models';

@Component({
  selector: 'app-consultant-education-certifications-edit',
  templateUrl: './consultant-education-certifications-edit.component.html',
  styleUrls: ['./consultant-education-certifications-edit.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class ConsultantEducationCertificationsEditComponents implements OnDestroy {

  private certificationArray = [];
  private educationArray = [];
  private items = ["item"];

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantEducationCertificationsEditComponents>,
    private formBuilder: FormBuilder
  ) { }

  educationCertificationForm = this.formBuilder.group({
    school0: ['', Validators.required],
    levelOfDegree0: ['', Validators.required],
    endDate0: [''],
    eduOrCert0: ['1']
  });

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.educationCertificationForm.patchValue(consultant)));
  destroy$ = new Subject();

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.educationCertificationForm.valid) {
      const updatedData = this.getFormData();
      for (let i = 0; i < this.items.length; i++) {
        if (updatedData[`eduOrCert${i}`] === '1') {
          var education = {
            levelOfDegree: updatedData[`levelOfDegree${i}`],
            school: updatedData[`school${i}`],
            //database doesnt like school being a string for the moment.
            endDate: updatedData[`endDate${i}`]
          }
          this.educationArray.push(education);
          updatedData.education = [...this.educationArray];
        } else {
          console.log("here updatedata: ", updatedData)
          var certification = {
            dateRecieved: updatedData[`endDate${i}`],
            name: updatedData[`school${i}`],
            //database doesnt support this yet so keep it out for now
            //title: updatedData.title
          }
          this.certificationArray.push(certification);
          updatedData.certifications = [...this.certificationArray];
        }
      }
      console.log("updateConsultant.updatedData: ", updatedData)
      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
    }
  }

  addEduCert(): void {
    this.items.push("item")
    var outputObj = {};
    for (let i = 0; i < this.items.length; i++) {
      var outputObjTemp = {
        [`school${i}`]: ['', Validators.required],
        [`levelOfDegree${i}`]: ['', Validators.required],
        [`endDate${i}`]: [''],
        [`eduOrCert${i}`]: ['1']
      }
      outputObj = { ...outputObj, ...outputObjTemp }
    }
    // console.log("addEduCert.outputObj: ", outputObj)
    this.educationCertificationForm = this.formBuilder.group(outputObj)
    // console.log("addEduCert.educationCertificationForm: ", this.educationCertificationForm)
  }

  getFormData() {
    // console.log("getFormData.educationCertificationForm: ",this.educationCertificationForm)
    return this.educationCertificationForm.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
