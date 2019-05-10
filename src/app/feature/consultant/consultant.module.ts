import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';

import { ConsultantRoutingModule,
  ConsultantServiceModule,
  ConsultantViewComponent,
  ConsultantHeaderComponent,
  ConsultantBodyComponent,
  ConsultantHeaderEditComponent,
  ConsultantSectionHeaderComponent,
  ConsultantCoreSkillsComponent,
  ConsultantSkillsEditComponent,
  ConsultantTechnicalSkillsComponent,
  ConsultantEducationCertificationsComponent,
  ConsultantExperienceComponent,
  ConsultantSkillsEditAddRemoveComponent,
  ConsultantSkillsEditReorderDisplayComponent,
  SaveNewButtonComponent
} from './index';

@NgModule({
  declarations: [
    ConsultantViewComponent,
    ConsultantHeaderComponent,
    ConsultantBodyComponent,
    ConsultantHeaderEditComponent,
    ConsultantSectionHeaderComponent,
    ConsultantCoreSkillsComponent,
    ConsultantSkillsEditComponent,
    ConsultantSkillsEditAddRemoveComponent,
    ConsultantSkillsEditReorderDisplayComponent,
    ConsultantTechnicalSkillsComponent,
    ConsultantEducationCertificationsComponent,
    ConsultantExperienceComponent,
    SaveNewButtonComponent
  ],
  imports: [
    CommonModule,
    ConsultantServiceModule,
    ConsultantRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConsultantHeaderEditComponent, ConsultantSkillsEditComponent],
})
export class ConsultantModule { }
