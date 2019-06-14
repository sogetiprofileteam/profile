import { Component, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Experience } from '@core/models';
import { growShrink } from '@shared/animations/grow-shrink';

@Component({
  selector: 'app-consultant-experience-create',
  templateUrl: './consultant-experience-create.component.html',
  styleUrls: ['./consultant-experience-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    growShrink
  ]
})
export class ConsultantExperienceCreateComponent implements OnInit, OnDestroy {
  experienceForm = this.formBuilder.group({
    id: [null],
    companyName: [null, Validators.required],
    title: [null, Validators.required],
    startDate: [null, [Validators.required]],
    endDate: [null],
    descriptions: this.formBuilder.array([])
  });

  currentPositionControl = this.formBuilder.control(null);

  private _destroy$ = new Subject();

  currentPositionValue$ = new BehaviorSubject<boolean>(false);

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceCreateComponent>,
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
      const newExperience = this.getFormData();
      const consultant = this.consultantStore.consultant;
      consultant.experience.push(newExperience);

      this.consultantStore
        .updateConsultant(consultant)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this.close());
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
    return this.experienceForm.get('jobTitle');
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


