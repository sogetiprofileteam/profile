import { Component, OnInit, Optional, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Certification, Education } from '@core/models';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-education-certifications-form',
  templateUrl: './consultant-education-certifications-form.component.html',
  styleUrls: ['./consultant-education-certifications-form.component.scss']
})
export class ConsultantEducationCertificationsFormComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantEducationCertificationsFormComponent>,
    private formBuilder: FormBuilder
  ){}

  formTitle: string;
  formAction: string;
  type: string;
  years:any = [];

  eduCertForm = this.formBuilder.group({
    id: [null],
    institution: [null, Validators.required],
    title: [null, Validators.required],
    month: [null, Validators.required],
    year: [null, Validators.required]
  });

  ngOnInit() {
    this.configureForAddOrEdit();
  }

  //Creates a list of years for drop down. 
  //Ranges from 60 years prior to today and 6 years in the futurey.
  public yearList() {
    let years = [];
    let today = new Date();
    let year = today.getFullYear() - 60;
    while(year != (today.getFullYear() + 6)){
      years.push(year);
      year++;
    }
    return years;
  }

  private configureForAddOrEdit() {
    console.log("configureForAddOrEdit");
    this.years = this.yearList();
    if (this.data) {
      this.formTitle = 'Edit';
      this.formAction = 'Save';
      this.type = this.data.type;
      this.patchForm(this.data.eduOrCert);
    } else {
      this.eduCertForm.addControl('eduOrCert', this.formBuilder.control(1, Validators.required));
      this.formTitle = 'Add';
      this.formAction = 'Add';
    }
  }

  private patchForm(eduOrCert: Education | Certification) {
    console.log("patchForm");
    this.type === 'education' ? this.patchWithEdu(eduOrCert as Education) : this.patchWithCert(eduOrCert as Certification);
  }

  private patchWithEdu(edu: Education) {
    console.log("pathWithEdu");
    const patchVal = {
      id: edu.id,
      institution: edu.school.name,
      title: edu.subject,
      // date: edu.endDate,
      month: edu.endDate.getMonth(),
      year: edu.endDate.getFullYear()
    };
    console.log("patchValue is " + patchVal.institution);
    this.eduCertForm.patchValue(patchVal);
  }

  private patchWithCert(cert: Certification) {
    const patchVal = {
      id: cert.id,
      institution: cert.name,
      title: cert.title,
      date: cert.dateRecieved
    };

    this.eduCertForm.patchValue(patchVal);
  }

  submit() {
    this.data ? this.updateEduCert() : this.addEduCert();
    console.log("submit fxn - data:" + this.data);
  }

  addEduCert() {
    console.log("addEduCert");
    if (this.eduCertForm.valid) {
      // THIS NEEDS TO BE THE VALUE FROM THE RADIO CONTROL NOT TYPE, CUS WITH ADD THERE IS NO TYPE
      const newEduOrCert =
        this.propertyType.value === 'education'
          ? this.mapToEdu(this.eduCertForm.value)
          : this.mapToCert(this.eduCertForm.value);
      let eduOrCerts = this.consultantStore.consultant[this.propertyType.value];

      if (!eduOrCerts) {
        eduOrCerts = [];
      }

      eduOrCerts.push(newEduOrCert);
      this.dialogRef.close({ type: this.propertyType.value, eduOrCert: eduOrCerts});
    }
  }

  updateEduCert() {
    console.log("updateEduCert");
    if (this.eduCertForm.valid) {
      const eduOrCerts = this.consultantStore.consultant[this.type];
      eduOrCerts[this.data.index] =
        this.type === 'education'
          ? this.mapToEdu(this.eduCertForm.value)
          : this.mapToCert(this.eduCertForm.value);
      this.dialogRef.close({ type: this.type, eduOrCert: eduOrCerts});
    }
  }

  mapToEdu(formData: any): Education {
    console.log("mapToEdu");
    let year = formData.year;
    let monthIndex = formData.month;
    const edu = {
      id: formData.id,
      school: {
       name:  formData.institution,
      },
      subject: formData.title,
      startDate: new Date(year, monthIndex, 1),
      endDate: new Date(year, monthIndex, 1)
    };

    return edu as Education;
  }

  mapToCert(formData: any): Certification {
    let year = formData.year;
    let monthIndex = formData.month;
    const cert = {
      name: formData.institution,
      title: formData.title,
      dateRecieved: new Date(year, monthIndex, 1),
      id: formData.id
    };

    return cert as Certification;
  }

  get propertyType() {
    console.log("propertyType fxn eduCertForm: " + this.eduCertForm);
    console.log("propertyType fxn eduCertForm.get(('eduOrCert'): " + this.eduCertForm.get('eduOrCert'));
    return this.eduCertForm.get('eduOrCert');
  }

}
