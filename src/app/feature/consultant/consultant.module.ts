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
  MatRadioModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule
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
  ConsultantExperienceDeleteDialogComponent,
  ConsultantExperienceFormComponent
} from './index';
import { ConsultantEducationCertificationsEditItemComponent } from './components/consultant-education-certifications-edit-item/consultant-education-certifications-edit-item.component';
import { ConsultantEducationCertificationsExistingEditComponent } from './components/consultant-education-certifications-existing-edit/consultant-education-certifications-existing-edit.component';
import { ConsultantEduCertSectionHeaderComponent } from './components/shared/consultant-edu-cert-section-header/consultant-edu-cert-section-header.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    ConsultantEducationCertificationsEditItemComponent,
    ConsultantEducationCertificationsExistingEditComponent,
    ConsultantEduCertSectionHeaderComponent,
    ConsultantEducationCertificationsEditComponent,
    ConsultantExperienceComponent,
    SaveNewButtonComponent,
    ConsultantPictureEditComponent,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  entryComponents: [
    ConsultantHeaderEditComponent,
    ConsultantSkillsEditComponent,
    ConsultantPictureEditComponent,
    ConsultantEducationCertificationsEditComponent,
    ConsultantEducationCertificationsExistingEditComponent,
    ConsultantExperienceDeleteDialogComponent,
    ConsultantExperienceFormComponent
  ],
  providers: [
    ConsultantStore,
    TechnicalSkillsService,
    CoreSkillsService,
    SkillsDataService,
    ConsultantSkillsEditService,
    MatDatepickerModule
  ]
})

export class ConsultantModule { }
