import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile-view/profile.component';
import { ProfileViewService } from './profile-view/profile-view.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  providers: [ ProfileViewService ]
})
export class ProfileModule { }
