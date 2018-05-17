import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile-view/profile.component';
import { ProfileViewService } from './profile-view/profile-view.service';
import { FileUploadModule } from '../shared/components/file-upload/file-upload.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    FormsModule
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  providers: [ ProfileViewService ]
})
export class ProfileModule { }
