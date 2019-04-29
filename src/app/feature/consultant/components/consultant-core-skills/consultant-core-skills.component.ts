import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantSkillsEditComponent } from '../shared/consultant-skills-edit/consultant-skills-edit.component';
import { SKILL_CORE } from '@core/models';
import { map } from 'rxjs/operators';
import { filterAndSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';

@Component({
  selector: 'app-consultant-core-skills',
  templateUrl: './consultant-core-skills.component.html',
  styleUrls: ['./consultant-core-skills.component.scss']
})
export class ConsultantCoreSkillsComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  coreSkills$ = 
    this.consultantStore.consultant$
      .pipe(
        map(c => filterAndSortDisplaySkills(c.coreSkills))
      );
      
  ngOnInit() {
  }

  openEditSkillsDialog() {
    this.dialog.open(ConsultantSkillsEditComponent, { data: { type: SKILL_CORE } });
  }

}
