import { NgModule } from '@angular/core';
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';
import { ProfileDisplayComponent } from './components/profile-display/profile-display.component';
import { CommonModule } from '@angular/common';

import {
  ConsultantsViewComponent,
  ConsultantsRoutingModule,
} from './index';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { ConsultantsStoreService } from './services/consultants-store/consultants-store.service';

@NgModule({
  declarations: [
    ConsultantsViewComponent,
    ProfileDisplayComponent,
    SearchSidebarComponent
  ],
  imports: [
    CommonModule,
    ConsultantsRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule
  ],
  providers: [ConsultantsStoreService]
})
export class ConsultantsModule { }
