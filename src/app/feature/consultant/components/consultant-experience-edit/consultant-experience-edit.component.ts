import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  OnInit,
  Inject
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { tap, takeUntil, map } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConsultantStore } from '../../services/consultant-store/consultant-store.service';
import { Experience } from '@core/models';
import { growShrink } from '@shared/animations/grow-shrink';

@Component({
  selector: 'app-consultant-experience-edit',
  templateUrl: './consultant-experience-edit.component.html',
  styleUrls: ['./consultant-experience-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [growShrink]
})
export class ConsultantExperienceEditComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceEditComponent>,
    private formBuilder: FormBuilder,
  ) {}

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

  private _destroy$ = new Subject();
  currentPositionValue$ = new BehaviorSubject<boolean>(false);
  consultant$ = this.consultantStore.consultant$.pipe(
    tap(consultant => this.patchExperienceForm(consultant.experience[this.data.index]))
  );

  currentPositionControl = this.formBuilder.control(null);

  experienceForm = this.formBuilder.group({
    id: [''],
    companyName: ['', Validators.required],
    title: ['', Validators.required],
    startDate: ['', [Validators.required]],
    endDate: [''],
    descriptions: this.formBuilder.array([])
  });
  consultant: Experience;

  patchExperienceForm(experience: Experience) {
    this.experienceForm.patchValue(experience);

    experience.descriptions.forEach(description =>
      this.descriptions.push(
        this.formBuilder.group({
          id: description.id,
          summary: [description.summary, Validators.required]
        })
      )
    );
  }

  patchCurrentPositionControl(experience: Experience) {
    const patchValue = experience.endDate ? false : true;
    this.currentPositionControl.patchValue(patchValue);
  }

  ngOnInit() {
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
      this.consultantStore.consultant.experience[
        this.data.index
      ] = this.experienceForm.value;

      this.consultantStore
        .updateConsultant(this.consultant)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this.close());
    }
  }

  getFormData(): Experience {
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
}
