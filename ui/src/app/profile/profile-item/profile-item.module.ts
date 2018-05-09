import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileItemComponent } from './profile-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ProfileItemComponent],
  exports: [ProfileItemComponent]
})
export class ProfileItemModule { }
