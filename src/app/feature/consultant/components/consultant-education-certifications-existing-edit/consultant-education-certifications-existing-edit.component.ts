import { Component, OnInit, Inject } from '@angular/core';
import { ConsultantStore } from '@feature/consultant';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material'

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

  educationCertificationForm = this.formBuilder.group({
    school0: ['', Validators.required],
    levelOfDegree0: ['', Validators.required],
    endDate0: [''],
    eduOrCert0: ['1', Validators.required]
  });

  consultant$ = this.consultantStore.consultant$.pipe(
    tap(consultant => {
      console.log("this.data.eduOrCert: ", this.data.eduOrCert)
      if (this.data.eduOrCert === "1") {
        const education = consultant.education[this.data.index];
        console.log("education: ", education)
        this.patchForm(education);
      } else {
        const cert = consultant.certifications[this.data.index];
        console.log("certs: ", cert)
        this.patchCertForm(cert);
      }
    })
  );

  patchForm(education) {
    this.educationCertificationForm.patchValue({
      endDate0: education.endDate,
      levelOfDegree0: education.levelOfDegree,
      school0: education.school,
      eduOrCert0: "1"
    })
  }

  patchCertForm(cert) {
    this.educationCertificationForm.patchValue({
      endDate0: cert.dateRecieved,
      levelOfDegree: " ", //not part of backend yet
      school0: cert.name,
      eduOrCert0: "2"
    })
  }

  destroy$ = new Subject();

  ngOnInit() { }

  updateConsultant() {
    if (this.educationCertificationForm.valid) {
      const updatedData = this.getFormData();
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
      this.consultantStore.updateConsultant(updatedData, this.data.index)
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
