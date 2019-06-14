import { Component, OnInit } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Experience } from '@core/models';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { tap, takeUntil } from 'rxjs/operators';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';
import { ConsultantExperienceEditComponent } from '../consultant-experience-edit/consultant-experience-edit.component';
import { ConsultantExperienceCreateComponent } from '../consultant-experience-create/consultant-experience-create.component';

@Component({
  selector: 'app-consultant-experience',
  templateUrl: './consultant-experience.component.html',
  styleUrls: ['./consultant-experience.component.scss']
})
export class ConsultantExperienceComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore,
    // private experience: Experience,
    private dialog: MatDialog
  ) { }

  consultant$ = this.consultantStore.consultant$;
  comp: ConsultantExperienceEditComponent;
  ngOnInit() {
  }

  openCreateExperienceDialog() {
    this.dialog.open(ConsultantExperienceCreateComponent);
  }

 // openEditExperienceDialog(expert: string) {
  openEditExperienceDialog() {
    //console.log("this is Cons-experience: " + expert);
    //console.log("This Consultant: " + this.consultantStore.consultant.experience[1].id);
   // console.log("This Consultant: " + this.consultant$.pipe((tap(consultant => this.comp.experienceForm.patchValue(consultant.experience[1].id)))));
    this.dialog.open(ConsultantExperienceEditComponent
   
    //  , {   experience: }
    );
  }


}
