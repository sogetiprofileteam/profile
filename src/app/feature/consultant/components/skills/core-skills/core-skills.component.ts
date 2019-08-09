import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { SkillsEditComponent } from '../skills-edit/skills-edit.component';
import { SKILL_CORE } from '@core/models';
import { map } from 'rxjs/operators';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';

@Component({
    selector: 'app-core-skills',
    templateUrl: './core-skills.component.html',
    styleUrls: ['./core-skills.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreSkillsComponent {

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
        this.dialog.open(SkillsEditComponent, {
            data: {
                type: SKILL_CORE
            }
        });
    }
}
