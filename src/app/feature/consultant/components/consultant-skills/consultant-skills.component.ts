import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantSkillsEditComponent } from '../consultant-skills-edit/consultant-skills-edit.component';

@Component({
  selector: 'app-consultant-skills',
  templateUrl: './consultant-skills.component.html',
  styleUrls: ['./consultant-skills.component.scss']
})
export class ConsultantSkillsComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }

  openEditSkillsDialog() {
    this.dialog.open(ConsultantSkillsEditComponent, { width: '400px' });
  }

}
