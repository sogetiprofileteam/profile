import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantSkillsEditComponent } from '../shared/consultant-skills-edit/consultant-skills-edit.component';

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

  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }

  openEditSkillsDialog() {
    this.dialog.open(ConsultantSkillsEditComponent, { data: { type: 'technicalSkills' } });
  }

}
