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
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule

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
  ConsultantSkillsEditService,
  ConsultantExperienceEditComponent,
  ConsultantExperienceCreateComponent,
  ConsultantExperienceDeleteDialogComponent

} from './index';
import { ConsultantExperienceFormComponent } from './components/consultant-experience/consultant-experience-form/consultant-experience-form.component';

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
    ConsultantPictureEditComponent,
    ConsultantExperienceEditComponent,
    ConsultantExperienceCreateComponent,
    ConsultantExperienceDeleteDialogComponent,
    ConsultantExperienceFormComponent
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
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  entryComponents: [
    ConsultantHeaderEditComponent,
    ConsultantSkillsEditComponent,
    ConsultantPictureEditComponent,
    ConsultantExperienceEditComponent,
    ConsultantExperienceCreateComponent,
    ConsultantEducationCertificationsEditComponent,
    ConsultantExperienceDeleteDialogComponent,
    ConsultantExperienceFormComponent
  ],
  providers: [ ConsultantStore, TechnicalSkillsService, CoreSkillsService, SkillsDataService, ConsultantSkillsEditService ]

})
export class ConsultantModule { }
