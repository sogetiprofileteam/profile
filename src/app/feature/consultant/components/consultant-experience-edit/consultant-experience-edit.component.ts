import { Component, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

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

 person = {
  companyName: 'Bell',
  title: 'Cashier',
  startDate: '02/05/2002',
  endDate: '01/10/2005',
  descriptions: [{
    summary: 'this is what I did'
  }]
}


  currentPositionControl = this.formBuilder.control(null);

  consultant$ = this.consultantStore.consultant$.pipe(tap(consultant => this.experienceForm.patchValue(consultant)));

  private _destroy$ = new Subject();

  currentPositionValue$ = new BehaviorSubject<boolean>(false);

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceEditComponent>,
    private formBuilder: FormBuilder
  ) { }

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
    if (this.experienceForm.valid) {
     // const newExperience = this.getFormData();
      const updatedData = this.getFormData();
      // const consultant = this.consultantStore.consultant;
      // consultant.experience.push(updatedData);

      this.consultantStore
        .updateConsultant(updatedData)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this.close());
    }
  
  }

  updateExperience(): void{

    console.log("This is experience-edit Consultant: " + this.consultantStore.consultant.experience[0].companyName);

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


