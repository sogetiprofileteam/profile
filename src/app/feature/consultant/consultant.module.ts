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
  HeaderComponent,
  ConsultantBodyComponent,
  HeaderEditComponent,
  SectionHeaderComponent,
  SectionSubHeaderComponent,
  SummaryComponent,
  SummaryEditComponent,
  CoreSkillsComponent,
  SkillsEditComponent,
  SkillsEditAddRemoveComponent,
  SkillsEditReorderDisplayComponent,
  TechnicalSkillsComponent,
  ConsultantEducationCertificationsComponent,
  ExperienceComponent,
  SaveNewButtonComponent,
  HeaderPictureEditComponent,
  ConsultantRoutingModule,
  ConsultantStore,
  TechnicalSkillsService,
  CoreSkillsService,
  SkillsDataService,
  SkillsEditService,
  ExperienceDeleteDialogComponent,
  ExperienceFormComponent,
  EducationCertificationsDeleteDialogComponent,
  EducationCertificationsFormComponent
} from './index';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { PhonePipe } from './components/shared/phone.pipe';

@NgModule({
  declarations: [
    ConsultantViewComponent,
    HeaderComponent,
    ConsultantBodyComponent,
    HeaderEditComponent,
    SectionHeaderComponent,
    SectionSubHeaderComponent,
    SummaryComponent,
    SummaryEditComponent,
    CoreSkillsComponent,
    SkillsEditComponent,
    SkillsEditAddRemoveComponent,
    SkillsEditReorderDisplayComponent,
    TechnicalSkillsComponent,
    ConsultantEducationCertificationsComponent,
    ExperienceComponent,
    SaveNewButtonComponent,
    HeaderPictureEditComponent,
    ExperienceDeleteDialogComponent,
    ExperienceFormComponent,
    EducationCertificationsFormComponent,
    EducationCertificationsDeleteDialogComponent,
    PhonePipe
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
    HeaderEditComponent,
    SkillsEditComponent,
    HeaderPictureEditComponent,
    SummaryEditComponent,
    ExperienceDeleteDialogComponent,
    ExperienceFormComponent,
    EducationCertificationsFormComponent,
    EducationCertificationsDeleteDialogComponent
  ],
  providers: [ ConsultantStore, TechnicalSkillsService, CoreSkillsService, SkillsDataService, SkillsEditService]

})
export class ConsultantModule { }
