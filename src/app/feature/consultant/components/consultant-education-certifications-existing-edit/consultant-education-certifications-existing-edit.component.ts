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

  eduOrCert0: string;
  school0: string;
  levelOfDegree0: string;
  endDate0: Date;

  educationCertificationForm = this.formBuilder.group({
    school0: ['test', Validators.required],
    levelOfDegree0: ['test', Validators.required],
    endDate0: ['test'],
    eduOrCert0: ['1', Validators.required]
  });

  


  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.educationCertificationForm.patchValue(consultant)));
  destroy$ = new Subject();

  ngOnInit() {

    this.educationCertificationForm.patchValue({
      endDate0: "12/12/1212",
      levelOfDegree0: "levelofdegree",
      school0: "school",
      eduOrCert0: "1" //TODO fix
    })
    console.log("BEFOREngOnInit.this.educationCertificationForm: ", this.educationCertificationForm)
    this.consultantStore.consultant$.subscribe(res => {
      console.log("res:", res);
      console.log("index:", this.data.index);
      console.log("res.education: ", res.education)
      console.log("res.education[this.data.index]: ", res.education[this.data.index])
      console.log("res.education[this.data.index].school: ", res.education[this.data.index].school)



      // this.educationCertificationForm.get('eduOrCert0').setValue("1"); //TODO fix
      // this.educationCertificationForm.get('endDate0').setValue(res.education[this.data.index].endDate);
      // this.educationCertificationForm.get('levelOfDegree0').setValue(res.education[this.data.index].levelOfDegree);
      // this.educationCertificationForm.get('school0').setValue(res.education[this.data.index].school);

      // this.educationCertificationForm = this.formBuilder.group({
      //   school0: [res.education[this.data.index].school, Validators.required],
      //   levelOfDegree0: [res.education[this.data.index].levelOfDegree, Validators.required],
      //   endDate0: [res.education[this.data.index].endDate],
      //   eduOrCert0: ['1', Validators.required]
      // });
    

      // this.educationCertificationForm.controls['eduOrCert0'].setValue("1"); //TODO fix
      // this.educationCertificationForm.controls['endDate0'].setValue(res.education[this.data.index].endDate);
      // this.educationCertificationForm.controls['levelOfDegree0'].setValue(res.education[this.data.index].levelOfDegree)
      // this.educationCertificationForm.controls['school0'].setValue(res.education[this.data.index].school)
      // this.educationCertificationForm.value['eduOrCert0'] = "1" //TODO fix
      // this.educationCertificationForm.value['endDate0'] = res.education[this.data.index].endDate
      // this.educationCertificationForm.value['levelOfDegree0'] = res.education[this.data.index].levelOfDegree
      // this.educationCertificationForm.value['school0'] = res.education[this.data.index].school

      // this.endDate0 = res.education[this.data.index].endDate
      // this.levelOfDegree0 = res.education[this.data.index].levelOfDegree
      // this.school0 = res.education[this.data.index].school
      // this.eduOrCert0 = "1" //TODO fix

      this.educationCertificationForm.patchValue({
        endDate0: res.education[this.data.index].endDate,
        levelOfDegree0: res.education[this.data.index].levelOfDegree,
        school0: res.education[this.data.index].school,
        eduOrCert0: "1" //TODO fix
      })
      console.log("ngOnInit.this.educationCertificationForm: ", this.educationCertificationForm)

    });
  }

  updateConsultant() {
    if (this.educationCertificationForm.valid) {
      this.educationCertificationForm.patchValue({
        school0: 'Nancy'
      });
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
