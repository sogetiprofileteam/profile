import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectedSkill, Skill, SkillType } from '@feature/consultant/models';
import { MatChip, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';

export interface SkillsEditDialogData {
  type: SkillType;
}

export interface SkillOption extends Skill {
  selected: boolean;
}

@Component({
  selector: 'app-consultant-skills-edit-add-remove',
  templateUrl: './consultant-skills-edit-add-remove.component.html',
  styleUrls: ['./consultant-skills-edit-add-remove.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditAddRemoveComponent {
  @Input() skillOptions$: Observable<SkillOption[]>;
  @Input() selectedSkills$: Observable<SelectedSkill[]>;

  constructor() { }

  toggleChipSelection(chip: MatChip) {

  }

  removeSkill(removedSkill: SelectedSkill) {

  }

  addSkill(event: MatAutocompleteSelectedEvent) {

  }

  addNewSkill(event: MatChipInputEvent) {

  }

}
