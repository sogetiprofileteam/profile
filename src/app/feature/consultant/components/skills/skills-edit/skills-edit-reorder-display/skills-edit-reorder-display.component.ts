import { Component,  ChangeDetectionStrategy } from '@angular/core';
import { SelectedSkill } from '@core/models';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SkillsEditService } from '../skills-edit-service/skills-edit.service';

@Component({
  selector: 'app-skills-edit-reorder-display',
  templateUrl: './skills-edit-reorder-display.component.html',
  styleUrls: ['./skills-edit-reorder-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsEditReorderDisplayComponent {
  displaySkills$ = this.skillEditService.displaySkills$;

  constructor(
    private skillEditService: SkillsEditService
  ) { }

  reorderDisplaySkill(event: CdkDragDrop<SelectedSkill[]>) {
    this.skillEditService.displaySkillReordered(event);
  }

}
