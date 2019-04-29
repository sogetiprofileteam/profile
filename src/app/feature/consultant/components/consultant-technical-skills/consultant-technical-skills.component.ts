import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantSkillsEditComponent } from '../shared/consultant-skills-edit/consultant-skills-edit.component';
import { SKILL_TECHNICAL } from '@core/models';
import { map } from 'rxjs/operators';
import { filterAndSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';

@Component({
  selector: 'app-consultant-technical-skills',
  templateUrl: './consultant-technical-skills.component.html',
  styleUrls: ['./consultant-technical-skills.component.scss']
})
export class ConsultantTechnicalSkillsComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog
  ) { }

  technicalSkills$ = 
    this.consultantStore.consultant$
      .pipe(
        map(c => filterAndSortDisplaySkills(c.technicalSkills))
      );

  ngOnInit() {
  }

  openEditSkillsDialog() {
    this.dialog.open(ConsultantSkillsEditComponent, { data: { type: SKILL_TECHNICAL } });
  }

}
