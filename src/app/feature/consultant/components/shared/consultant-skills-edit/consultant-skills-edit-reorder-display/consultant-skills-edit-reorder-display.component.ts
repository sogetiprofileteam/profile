import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectedSkill } from '@feature/consultant/models';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-consultant-skills-edit-reorder-display',
  templateUrl: './consultant-skills-edit-reorder-display.component.html',
  styleUrls: ['./consultant-skills-edit-reorder-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditReorderDisplayComponent {
  @Input() displaySkills$: Observable<SelectedSkill[]>;

  constructor() { }

  reorderDisplaySkill(event: CdkDragDrop<SelectedSkill[]>) {

  }

}
