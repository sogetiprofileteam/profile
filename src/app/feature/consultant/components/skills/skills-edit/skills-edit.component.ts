import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SkillType, SKILL_CORE } from '@core/models';
import { SkillsEditService } from './skills-edit-service/skills-edit.service';
import { take } from 'rxjs/operators';

export interface SkillsEditDialogData {
  type: SkillType;
}

@Component({
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkillsEditService]
})
export class SkillsEditComponent implements OnInit {
  readonly skillType: SkillType = this.data.type;
  readonly skillProperty = this.skillType === SKILL_CORE ? 'coreSkills' : 'technicalSkills';

  readonly title = this.skillType === SKILL_CORE ? 'Core' : 'Technical';

  constructor(
    private skillEditService: SkillsEditService,
    @Inject(MAT_DIALOG_DATA) public data: SkillsEditDialogData,
    private dialogRef: MatDialogRef<SkillsEditComponent>,
  ) { }

  // Would normally have this be the ConsultantStore observable but the
  // skillEditService is already injected and uses the ConsultantStore
  consultant$ = this.skillEditService.consultant$;

  ngOnInit() {
    this.skillEditService.init(this.skillType, this.skillProperty);
    this.skillEditService.closeDialog$.pipe(take(1)).subscribe(() => this.close());
  }

  updateConsultant() {
    this.skillEditService.updateConsultant();
  }

  close(): void {
    this.dialogRef.close();
  }

}
