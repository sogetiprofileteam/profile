import { Component, OnInit, Inject } from '@angular/core';
import { ConsultantStore } from '@feature/consultant';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-consultant-education-certifications-existing-edit',
  templateUrl: './consultant-education-certifications-existing-edit.component.html',
  styleUrls: ['./consultant-education-certifications-existing-edit.component.scss']
})
export class ConsultantEducationCertificationsExistingEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantEducationCertificationsExistingEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  eduOrCert0: string;
  school0: string;
  levelOfDegree0: string;
  endDate0: string;

  educationCertificationForm = this.formBuilder.group({
    school0: ['', Validators.required],
    levelOfDegree0: ['', Validators.required],
    endDate0: [''],
    eduOrCert0: ['1', Validators.required]
  });

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.educationCertificationForm.patchValue(consultant)));
  destroy$ = new Subject();

  ngOnInit() {
    console.log("educationCertificationForm: ", this.educationCertificationForm)
    this.eduOrCert0 = this.educationCertificationForm.value.eduOrCert0;
    this.school0 = this.educationCertificationForm.value.school0;
    this.levelOfDegree0 = this.educationCertificationForm.value.levelOfDegree0;
    this.endDate0 = this.educationCertificationForm.value.endDate0;

  }

  updateConsultant() {
    if (this.educationCertificationForm.valid) {
      const updatedData = this.getFormData();
      // console.log("updateConsultant.this.consultantStore: ", this.consultantStore)
      console.log("updateConsultant.this.educationCertificationForm", this.educationCertificationForm)
      // this.consultantStore.consultant$.experience[
      //   this.data.index
      // ] = updatedData;
      console.log("updateConsultant.this.data.index: ", this.data.index)
      console.log("updateConsultant.updatedData: ", updatedData)
      if (updatedData.eduOrCert0 === '1') {
        var education = {
          levelOfDegree: updatedData.levelOfDegree0,
          school: updatedData.school0,
          endDate: updatedData.endDate0
        }
        updatedData.education = [education];
      } else {
        var certification = {
          dateRecieved: updatedData.endDate0,
          name: updatedData.school0,
          //database doesnt support this yet so keep it out for now
          //title: updatedData.title
        }
        updatedData.certifications = [certification];
      }
      console.log("updateConsultant.updatedData: ", updatedData)
      //i dont need to updateConsoultant the consultant object already has it
      this.consultantStore.updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.close());
      
      this.educationCertificationForm.reset({});
    }
  }

  getFormData() {
    return this.educationCertificationForm.value;
  }

  close(): void {
    this.dialogRef.close();
  }

}
