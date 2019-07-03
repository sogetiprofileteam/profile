import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill, SkillType, SKILL_CORE } from '@core/models';
import { ConsultantSkillsEditService } from './consultant-skills-edit-service/consultant-skills-edit.service';
import { take } from 'rxjs/operators';
import { NotificationsService } from '@core/services/notifications/notifications.service';

export interface SkillsEditDialogData {
  type: SkillType;
}

@Component({
  selector: 'app-consultant-skills-edit',
  templateUrl: './consultant-skills-edit.component.html',
  styleUrls: ['./consultant-skills-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConsultantSkillsEditService]
})
export class ConsultantSkillsEditComponent implements OnInit {
  readonly skillType: SkillType = this.data.type;
  readonly skillProperty = this.skillType === SKILL_CORE ? 'coreSkills' : 'technicalSkills';

  readonly title = this.skillType === SKILL_CORE ? 'Core' : 'Technical';

  constructor(
    private skillEditService: ConsultantSkillsEditService,
    @Inject(MAT_DIALOG_DATA) public data: SkillsEditDialogData,
    private notification: NotificationsService,
    private dialogRef: MatDialogRef<ConsultantSkillsEditComponent>,
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
    if(this.skillEditService.updateConsultant() == void{} ){
      this.notification.openUpdatedSnackBar();
    }
    else {
      this.notification.openErrorUpdatingSnackBar();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
