import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantSkillsEditComponent } from '../consultant-skills-edit/consultant-skills-edit.component';
import { SKILL_TECHNICAL } from '@core/models';
import { map } from 'rxjs/operators';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';

@Component({
  selector: 'app-consultant-technical-skills',
  templateUrl: './consultant-technical-skills.component.html',
  styleUrls: ['./consultant-technical-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantTechnicalSkillsComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog
  ) { }

  technicalSkills$ =
    this.consultantStore.consultant$
      .pipe(
        map(c => filterSortDisplaySkills(c.technicalSkills))
      );

  openEditSkillsDialog() {
    this.dialog.open(ConsultantSkillsEditComponent, { data: { type: SKILL_TECHNICAL } });
  }

}
