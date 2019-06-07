import { Component, OnInit } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Experience } from '@core/models';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';
import { ConsultantExperienceEditComponent } from '../consultant-experience-edit/consultant-experience-edit.component';

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

  ngOnInit() {
  }

  openEditExperienceDialog() {
    this.dialog.open(ConsultantExperienceEditComponent);
  }

}
