import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ImageCropperModule } from 'ngx-image-cropper';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { readFileSync } from 'fs';

import {
  ConsultantViewComponent,
  ConsultantHeaderComponent,
  ConsultantBodyComponent,
  ConsultantHeaderEditComponent,
  ConsultantSectionHeaderComponent,
  ConsultantSectionSubHeaderComponent,
  ConsultantSummaryComponent,
  ConsultantSummaryEditComponent,
  ConsultantCoreSkillsComponent,
  ConsultantSkillsEditComponent,
  ConsultantSkillsEditAddRemoveComponent,
  ConsultantSkillsEditReorderDisplayComponent,
  ConsultantTechnicalSkillsComponent,
  ConsultantEducationCertificationsComponent,
  ConsultantExperienceComponent,
  SaveNewButtonComponent,
  ConsultantPictureEditComponent,
  ConsultantRoutingModule,
  ConsultantStore,
  TechnicalSkillsService,
  CoreSkillsService,
  SkillsDataService,
  ConsultantSkillsEditService,
  ConsultantExperienceDeleteDialogComponent,
  ConsultantExperienceFormComponent,
  ConsultantEducationCertificationsDeleteDialogComponent,
  ConsultantEducationCertificationsFormComponent
} from './index';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    ConsultantViewComponent,
    ConsultantHeaderComponent,
    ConsultantBodyComponent,
    ConsultantHeaderEditComponent,
    ConsultantSectionHeaderComponent,
    ConsultantSectionSubHeaderComponent,
    ConsultantSummaryComponent,
    ConsultantSummaryEditComponent,
    ConsultantCoreSkillsComponent,
    ConsultantSkillsEditComponent,
    ConsultantSkillsEditAddRemoveComponent,
    ConsultantSkillsEditReorderDisplayComponent,
    ConsultantTechnicalSkillsComponent,
    ConsultantEducationCertificationsComponent,
    ConsultantExperienceComponent,
    SaveNewButtonComponent,
    ConsultantPictureEditComponent,
    ConsultantExperienceDeleteDialogComponent,
    ConsultantExperienceFormComponent,
    ConsultantEducationCertificationsFormComponent,
    ConsultantEducationCertificationsDeleteDialogComponent
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
    ConsultantSummaryEditComponent,
    ConsultantExperienceDeleteDialogComponent,
    ConsultantExperienceFormComponent,
    ConsultantEducationCertificationsFormComponent,
    ConsultantEducationCertificationsDeleteDialogComponent
  ],
  providers: [ ConsultantStore, TechnicalSkillsService, CoreSkillsService, SkillsDataService, ConsultantSkillsEditService ]

})
export class ConsultantModule { }
