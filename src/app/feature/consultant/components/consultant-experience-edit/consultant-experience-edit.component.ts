import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  OnInit,
  Inject
} from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { tap, takeUntil, map } from "rxjs/operators";
import { Subject, BehaviorSubject, Observable } from "rxjs";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { ConsultantStore } from "@feature/consultant/services/consultant-store/consultant-store.service";
import { Experience, Consultant } from "@core/models";
import { growShrink } from "@shared/animations/grow-shrink";

@Component({
  selector: "app-consultant-experience-edit",
  templateUrl: "./consultant-experience-edit.component.html",
  styleUrls: ["./consultant-experience-edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [growShrink]
})
export class ConsultantExperienceEditComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantExperienceEditComponent>,
    private formBuilder: FormBuilder
  ) {}

  get companyName() {
    return this.experienceForm.get("companyName");
  }

  get title() {
    return this.experienceForm.get("title");
  }

  get startDate() {
    return this.experienceForm.get("startDate");
  }

  get endDate() {
    return this.experienceForm.get("endDate");
  }

  get descriptions() {
    return this.experienceForm.get("descriptions") as FormArray;
  }

  private _destroy$ = new Subject();
  currentPositionValue$ = new BehaviorSubject<boolean>(false);
  consultant$ = this.consultantStore.consultant$.pipe(
    tap(consultant => {
      const experience = consultant.experience[this.data.index];
      // this.patchCurrentPositionControl(experience);
      this.patchExperienceForm(experience);
    })
  );

  currentPositionControl = this.formBuilder.control(null);

  experienceForm = this.formBuilder.group({
    id: [""],
    companyName: ["", Validators.required],
    title: ["", Validators.required],
    startDate: ["", [Validators.required]],
    endDate: [""],
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
      console.log("Experience form is valid");
      this.consultantStore.consultant.experience[
        this.data.index
      ] = this.experienceForm.value;

      this.consultantStore
        .updateConsultant(this.consultant)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this.close());
    }
  }

  removeExperience(consultant: Consultant, index: number): void {
    const newExperience = { ...consultant.experience };
    newExperience.splice(index, 1);
    console.log("index = " + index);
    this.consultantStore.updateConsultant(this.consultant)
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => this.close());

}
// by Index
deleteExp(consultant: Consultant, experience:Experience): void {

  experience = this.consultantStore.consultant.experience[this.data.index];
  const index = this.consultantStore.consultant.experience.indexOf(experience);

  const tracker= experience.companyName;
  let updatedExperience = [...this.consultantStore.consultant.experience];

  //--------------------START CONSOLE LOGS ---------------------------------
  console.log("Index = " + tracker );
  console.log("updatedEx = " + updatedExperience );
  if(this.data.index === index){
    console.log("Match! this.data.index = " + this.data.index + " and " + "splice index info = " + index );
  }
  console.log("Updated Splice: " + updatedExperience.splice(index, 1));
  //--------------------END CONSOLE LOGS ---------------------------------

  updatedExperience.splice(index, 1);

  //check logs to see if list is updated
  this.consultantStore.consultant.experience.forEach(element => {
    console.log("Array List " + element.companyName);
  });

  this.consultantStore.updateConsultant(this.consultantStore.consultant)
  .pipe(takeUntil(this._destroy$))
  .subscribe(() => this.close());

}


    // const index = this.consultantStore.consultant.experience.indexOf(experience);
    // const updatedExperience = [...this.consultantStore.consultant.experience];
    // updatedExperience.splice(index, 1);
    // console.log("Attempting to delete: " + experience.companyName);

  // removeExperience(experience) {
  //   this.skillEditService.removeSkill(experience);
  // }

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
}
