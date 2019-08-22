import { ProfileImageService } from './../../core/services/profileImagesZ/profile-image.service';
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



import {
  ConsultantViewComponent,
  ConsultantHeaderComponent,
  ConsultantBodyComponent,
  ConsultantHeaderEditComponent,
  ConsultantSectionHeaderComponent,
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
  NotificationsService,
  ConsultantExperienceDeleteDialogComponent,
  ConsultantExperienceFormComponent,
  ProfileImagesService
} from './index';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatSnackBarModule } from '@angular/material';
import { BLOB_STORAGE_TOKEN, IBlobStorage } from '@core/services/profileImages/profile-images';

export function azureBlobStorageFactory(): IBlobStorage {
  console.log(window)
  return window['AzureStorage'].Blob;
}


@NgModule({
  declarations: [
    ConsultantViewComponent,
    ConsultantHeaderComponent,
    ConsultantBodyComponent,
    ConsultantHeaderEditComponent,
    ConsultantSectionHeaderComponent,
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
    MatSnackBarModule
  ],
  entryComponents: [
    ConsultantHeaderEditComponent,
    ConsultantSkillsEditComponent,
    ConsultantPictureEditComponent,
    ConsultantSummaryEditComponent,
    ConsultantExperienceDeleteDialogComponent,
    ConsultantExperienceFormComponent
  ],
  providers: [ ConsultantStore, TechnicalSkillsService, CoreSkillsService, SkillsDataService, ConsultantSkillsEditService, NotificationsService,
    ProfileImagesService,
    {
      provide: BLOB_STORAGE_TOKEN,
      useFactory: azureBlobStorageFactory
    }, ProfileImageService ]

})
export class ConsultantModule { }
