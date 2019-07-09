import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  Optional
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { NotificationsService } from '@core/services/notifications/notifications.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Experience } from '@core/models';
import { growShrink } from '@shared/animations/grow-shrink';

@Component({
  selector: 'app-consultant-experience-form',
  templateUrl: './consultant-experience-form.component.html',
  styleUrls: ['./consultant-experience-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [growShrink]
})
export class ConsultantExperienceFormComponent implements OnInit, OnDestroy {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private notification: NotificationsService,
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceFormComponent>,
    private formBuilder: FormBuilder
  ) {}

  formTitle: string;
  formAction: string;

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

  ngOnInit() {
    this.configureForAddOrEdit();
    this.watchCurrentPositionControl();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private configureForAddOrEdit() {
    if (this.data) {
      this.formTitle = 'Edit';
      this.formAction = 'Save';
      this.patchExperienceForm(this.data.experience);
    } else {
      this.addDescription();
      this.formTitle = 'Add';
      this.formAction = 'Add';
    }
  }

  private patchExperienceForm(experience: Experience) {
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

  private watchCurrentPositionControl() {
    this.currentPositionControl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.endDate.setValue(null);
        this.currentPositionValue$.next(!this.currentPositionValue$.value);
      });
  }

  private close(returnExperience: Experience[]): void {
    this.dialogRef.close(returnExperience);
  }

  submit() {
    this.data ? this.updateExperience() : this.addExperience();
  }

  private addExperience(): void {
    if (this.experienceForm.valid) {
      const newExperience = this.getFormData();
      let experience = this.consultantStore.consultant.experience;

      if (!experience) {
        experience = [];
      }
      experience.push(newExperience);
      this.close(experience);
      this.notification.openUpdatedSnackBar();
    }
  }

  private updateExperience(): void {
    const experience = this.consultantStore.consultant.experience;

    if (this.experienceForm.valid) {
      experience[this.data.index] = this.getFormData();
      this.close(experience);
      this.notification.openUpdatedSnackBar();
    } else {
      this.close(experience);
      this.notification.openErrorUpdatingSnackBar();
    }
  }

  private getFormData(): Experience {
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
