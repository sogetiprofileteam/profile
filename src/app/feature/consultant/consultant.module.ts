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

import {
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
  ConsultantEducationCertificationsEditComponent,
  ConsultantExperienceComponent,
  SaveNewButtonComponent,
  ConsultantPictureEditComponent,
  ConsultantRoutingModule,
  ConsultantStore,
  TechnicalSkillsService,
  CoreSkillsService,
  SkillsDataService,
  ConsultantSkillsEditService 
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
    ConsultantEducationCertificationsEditComponent,
    ConsultantExperienceComponent,
    SaveNewButtonComponent,
    ConsultantPictureEditComponent
  ],
  imports: [
    CommonModule,
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
  entryComponents: [ ConsultantHeaderEditComponent, ConsultantSkillsEditComponent, ConsultantPictureEditComponent ],
  providers: [ ConsultantStore, TechnicalSkillsService, CoreSkillsService, SkillsDataService, ConsultantSkillsEditService ]
})
export class ConsultantModule { }
