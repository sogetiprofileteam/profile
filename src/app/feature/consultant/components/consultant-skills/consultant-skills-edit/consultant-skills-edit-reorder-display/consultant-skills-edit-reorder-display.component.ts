import { Component,  ChangeDetectionStrategy } from '@angular/core';
import { SelectedSkill } from '@core/models';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ConsultantSkillsEditService } from '../consultant-skills-edit-service/consultant-skills-edit.service';

@Component({
  selector: 'app-consultant-skills-edit-reorder-display',
  templateUrl: './consultant-skills-edit-reorder-display.component.html',
  styleUrls: ['./consultant-skills-edit-reorder-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditReorderDisplayComponent {
  displaySkills$ = this.skillEditService.displaySkills$;

  constructor(
    private skillEditService: ConsultantSkillsEditService
  ) { }

  reorderDisplaySkill(event: CdkDragDrop<SelectedSkill[]>) {
    this.skillEditService.displaySkillReordered(event);
  }

}
