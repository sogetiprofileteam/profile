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
    eduOrCert0: ['1', Validators.required]
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
        if (updatedData[`eduOrCert${this.items[i]}`] === '1') {
          var education = {
            levelOfDegree: updatedData[`levelOfDegree${this.items[i]}`],
            school: updatedData[`school${this.items[i]}`],
            endDate: updatedData[`endDate${this.items[i]}`]
          }
          this.educationArray.push(education);
          updatedData.education = [...this.educationArray];
        } else {
          var certification = {
            dateRecieved: updatedData[`endDate${this.items[i]}`],
            name: updatedData[`school${this.items[i]}`],
            //database doesnt support this yet so keep it out for now
            //title: updatedData.title
          }
          this.certificationArray.push(certification);
          updatedData.certifications = [...this.certificationArray];
        }
      }
      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());

      this.educationCertificationForm.reset({});
    }
  }

  addEduCert(): void {
    this.items.push(Math.max(...this.items) + 1);
    var outputObj = {};
    for (let i = 0; i < this.items.length; i++) {
      var outputObjTemp = {
        [`school${this.items[i]}`]: [this.educationCertificationForm.value[`school${this.items[i]}`], Validators.required],
        [`levelOfDegree${this.items[i]}`]: [this.educationCertificationForm.value[`levelOfDegree${this.items[i]}`], Validators.required],
        [`endDate${this.items[i]}`]: [this.educationCertificationForm.value[`endDate${this.items[i]}`]],
        [`eduOrCert${this.items[i]}`]: [this.educationCertificationForm.value[`eduOrCert${this.items[i]}`]]
      }
      outputObj = { ...outputObj, ...outputObjTemp }
    }
    this.educationCertificationForm = this.formBuilder.group(outputObj)
  }

  getFormData() {
    return this.educationCertificationForm.value;
  }

  isLastPanel(index: number ): boolean {
    if (this.items.length === index + 1) {
      return true;
    } else {
      return false;
    }
  }

  onDelete(item: number) {
    this.items.splice(this.items.indexOf(item), 1);
    this.educationCertificationForm.removeControl(`school${item}`);
    this.educationCertificationForm.removeControl(`levelOfDegree${item}`);
    this.educationCertificationForm.removeControl(`endDate${item}`);
    this.educationCertificationForm.removeControl(`eduOrCert${item}`);
    this.educationCertificationForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
