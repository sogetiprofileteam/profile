import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { startWith, mergeMap } from 'rxjs/operators';

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChip, MatChipInputEvent } from '@angular/material/chips';

import { SelectedSkill, SkillOption } from '@core/models';
import { ConsultantSkillsEditService } from '../consultant-skills-edit-service/consultant-skills-edit.service';

@Component({
  selector: 'app-consultant-skills-edit-add-remove',
  templateUrl: './consultant-skills-edit-add-remove.component.html',
  styleUrls: ['./consultant-skills-edit-add-remove.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditAddRemoveComponent {
  @ViewChild('skillInput', { static: true }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;

  @Output() chipSelectionToggled = new EventEmitter<MatChip>();
  @Output() skillRemoved = new EventEmitter<SelectedSkill>();
  @Output() skillAdded = new EventEmitter<MatAutocompleteSelectedEvent>();
  @Output() newSkillAdded = new EventEmitter<MatChipInputEvent>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly skillCtrl = new FormControl();

  selectedSkills$ = this.skillEditService.selectedSkills$;
  filteredAvailableSkills$ =
    this.skillCtrl.valueChanges
      .pipe(
        startWith(null),
        mergeMap((value: string | SkillOption) => {
          if (value) {
            const name = typeof value !== 'string' ? value.name : value;

            return this.skillEditService.filterSkills(name);
          } else {
            return this.skillEditService.availableSkills$;
          }
        })
      );

  constructor(
    private skillEditService: ConsultantSkillsEditService
  ) { }

  addSkill(event: MatAutocompleteSelectedEvent) {
    this.skillEditService.addSkill(event, this.skillCtrl, this.skillInput);
  }

  addNewSkill(event: MatChipInputEvent) {
    this.skillEditService.addNewSkill(event, this.matAutocomplete);
  }

  removeSkill(skill: SelectedSkill) {
    this.skillEditService.removeSkill(skill);
  }

  toggleChipSelection(chip: MatChip) {
    this.skillEditService.chipClicked(chip);
  }


}
