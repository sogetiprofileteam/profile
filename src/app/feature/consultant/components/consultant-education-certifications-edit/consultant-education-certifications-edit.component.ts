import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-education-certifications-edit',
  templateUrl: './consultant-education-certifications-edit.component.html',
  styleUrls: ['./consultant-education-certifications-edit.component.scss'],
})
export class ConsultantEducationCertificationsEditComponents implements OnDestroy {

  private certificationArray = [];
  private educationArray = [];
  private items = [0];

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
        console.log("items: ", this.items)
        if (updatedData[`eduOrCert${this.items[i]}`] === '1') {
          var education = {
            levelOfDegree: updatedData[`levelOfDegree${this.items[i]}`],
            school: updatedData[`school${this.items[i]}`],
            endDate: updatedData[`endDate${this.items[i]}`]
          }
          this.educationArray.push(education);
          updatedData.education = [...this.educationArray];
        } else {
          console.log("here updatedata: ", updatedData)
          var certification = {
            dateRecieved: updatedData[`endDate${this.items[i]}`],
            name: updatedData[`school${this.items[i]}`],
            //database doesnt support this yet so keep it out for now
            //title: updatedData.title
          }
          //TODO this seems to sometimes push obj full of undefineded stuff, fix
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
    this.items.push(this.items.length);
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
    this.educationCertificationForm = this.formBuilder.group(outputObj)
  }

  getFormData() {
    return this.educationCertificationForm.value;
  }

  isLastPanel(index): boolean {
    if(this.items.length === index + 1){
      return true;
    } else {
      return false;
    }
  }

  onDelete(index){
    this.items.splice(index, 1);
    delete this.educationCertificationForm.value[`school${index}`]
    delete this.educationCertificationForm.value[`levelOfDegree${index}`]
    delete this.educationCertificationForm.value[`endDate${index}`]
    delete this.educationCertificationForm.value[`eduOrCert${index}`]
    console.log("this.educationCertificationForm: ", this.educationCertificationForm)
    console.log("ondelete.index: ", index)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
