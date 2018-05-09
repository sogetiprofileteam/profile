import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile-view/profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule { }
