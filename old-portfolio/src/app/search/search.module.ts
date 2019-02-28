import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileItemModule } from '../profile/profile-item/profile-item.module';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileItemModule
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers: [SearchService]
})
export class SearchModule { }
