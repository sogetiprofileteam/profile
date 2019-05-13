import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ImageCropperModule } from 'ngx-image-cropper';

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
  SaveNewButtonComponent,
  ConsultantPictureEditComponent
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
    SaveNewButtonComponent,
    ConsultantPictureEditComponent
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
    ReactiveFormsModule,
    ImageCropperModule
  ],
  entryComponents: [ConsultantHeaderEditComponent, ConsultantSkillsEditComponent, ConsultantPictureEditComponent],
})
export class ConsultantModule { }
