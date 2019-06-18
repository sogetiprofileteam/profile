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
  dialog: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceEditComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addDescription();
    this.editExperience();
    this.currentPositionControl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.endDate.setValue(null);
        this.currentPositionValue$.next(!this.currentPositionValue$.value);    
      });
}

 editExperience(): void {

  this.experienceForm.patchValue({
    companyName: this.consultantStore.consultant.experience[this.data.index].companyName,
    title: this.consultantStore.consultant.experience[this.data.index].title,
    startDate: this.consultantStore.consultant.experience[this.data.index].startDate,
    endDate: this.consultantStore.consultant.experience[this.data.index].endDate,
    descriptions: this.consultantStore.consultant.experience[this.data.index].descriptions
    });
}

  currentPositionControl = this.formBuilder.control(null);
  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.experienceForm.patchValue(consultant)));

  experience$ = 
    this.consultantStore.consultant$
    .pipe(tap(consultant => consultant.experience[this.data.index]));
  private _destroy$ = new Subject();

  currentPositionValue$ = new BehaviorSubject<boolean>(false);


  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(): void {
    if (this.experienceForm.valid ) {
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


