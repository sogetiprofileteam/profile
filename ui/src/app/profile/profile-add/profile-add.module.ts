import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileAddComponent } from './profile-add.component';

import { ProfileAddService } from './profile-add.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ProfileAddComponent],
  exports: [ProfileAddComponent],
  providers: [ProfileAddService]
})
export class ProfileAddModule { }
