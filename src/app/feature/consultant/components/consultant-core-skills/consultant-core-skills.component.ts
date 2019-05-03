import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantSkillsEditComponent } from '../shared/consultant-skills-edit/consultant-skills-edit.component';
import { SKILL_CORE } from '@feature/consultant/models';
import { map } from 'rxjs/operators';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';

@Component({
  selector: 'app-consultant-core-skills',
  templateUrl: './consultant-core-skills.component.html',
  styleUrls: ['./consultant-core-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantCoreSkillsComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  coreSkills$ =
    this.consultantStore.consultant$
      .pipe(
        map(c => filterSortDisplaySkills(c.coreSkills))
      );

  openEditSkillsDialog() {
    this.dialog.open(ConsultantSkillsEditComponent, { data: { type: SKILL_CORE } });
  }

}
