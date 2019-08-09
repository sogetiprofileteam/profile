import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { SkillsEditComponent } from '../skills-edit/skills-edit.component';
import { SKILL_TECHNICAL } from '@core/models';
import { map } from 'rxjs/operators';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalSkillsComponent {

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
    this.dialog.open(SkillsEditComponent, { data: { type: SKILL_TECHNICAL } });
  }

}
