import { Component, OnDestroy, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Experience } from '@core/models';
import { growShrink } from '@shared/animations/grow-shrink';

@Component({
  selector: 'app-consultant-experience-edit',
  templateUrl: './consultant-experience-edit.component.html',
  styleUrls: ['./consultant-experience-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    growShrink
  ]
})
export class ConsultantExperienceEditComponent implements OnInit, OnDestroy {
  experienceForm = this.formBuilder.group({
    id: [''],
    companyName: ['', Validators.required],
    title: ['', Validators.required],
    startDate: ['', [Validators.required]],
    endDate: [''],
    descriptions: this.formBuilder.array([])
  });

 editExperience(): void {
   //Cycles through each element in experience array: Will only show last element for PatchValue 
   for(var i in this.consultantStore.consultant.experience){

   this.experienceForm.patchValue({
  companyName: this.consultantStore.consultant.experience[i].companyName,
  title: this.consultantStore.consultant.experience[i].title,
  startDate: this.consultantStore.consultant.experience[i].startDate,
  endDate: this.consultantStore.consultant.experience[i].endDate,
  descriptions: this.consultantStore.consultant.experience[i].descriptions
    });
   }
}



  currentPositionControl = this.formBuilder.control(null);
  

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.experienceForm.patchValue(consultant)));


  private _destroy$ = new Subject();

  currentPositionValue$ = new BehaviorSubject<boolean>(false);

  constructor(
    //@Inject(MAT_DIALOG_DATA) public data,
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  // experience$ = 
  //   this.consultantStore.consultant$
  //   .pipe(tap(consultant => consultant.experience[this.data.index]));

  ngOnInit() {
    this.addDescription();
    this.currentPositionControl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.endDate.setValue(null);
        this.currentPositionValue$.next(!this.currentPositionValue$.value);    
      });
}

  

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.experienceForm.valid ) {
      // this.consultantStore.consultant.experience[0].id = "randomId";
      // this.experienceForm.value.id = this.consultantStore.consultant.experience[0].id;
     // const newExperience = this.getFormData();
      const updatedData = this.getFormData();
       const consultant = this.consultantStore.consultant;
       consultant.experience.push(updatedData);

      this.consultantStore
        .updateConsultant(consultant)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this.close());
        console.log("Updating consultant: cons-exper-edit!");
          console.log(" VALUE OF CURRENT ID: " + this.experienceForm.value.id);
          console.log(" Value of 1st element in array: " + this.consultantStore.consultant.experience[0].id)
    }
  
  }


  updateExperience(): void{
    i: Number;
    for(var i in this.consultantStore.consultant.experience){
      if(this.consultantStore.consultant.experience[i].companyName === "Justright"){
        console.log("Match!: " + this.consultantStore.consultant.experience[i].companyName);
      }
      else{
        console.log("No Match: " + this.consultantStore.consultant.experience[i].companyName + " isn't Justright");
      }
    }

    //console.log("This is experience-edit Consultant: " + this.consultantStore.consultant.experience[i].companyName);

  }

  getFormData(): Experience {
    console.log("Form Data Value: " + this.experienceForm.value);
    return this.experienceForm.value as Experience;
  }

  addDescription() {
    this.descriptions.push(
      this.formBuilder.group({
        id: null,
        summary: [null, Validators.required]
      })
    );
    // TODO: scroll to bottom of last element added
    // to make sure user knows the input box appeared
  }

  removeDescription(index: number) {
    this.descriptions.removeAt(index);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  get companyName() {
    return this.experienceForm.get('companyName');
  }

  get title() {
    return this.experienceForm.get('title');
  }

  get startDate() {
    return this.experienceForm.get('startDate');
  }

  get endDate() {
    return this.experienceForm.get('endDate');
  }

  get descriptions() {
    return this.experienceForm.get('descriptions') as FormArray;
  }
}


