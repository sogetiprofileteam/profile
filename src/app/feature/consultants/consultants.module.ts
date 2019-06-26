import { NgModule } from '@angular/core';
import { ConsultantsSearchSidebarComponent } from './pages/consultants-search-sidebar/consultants-search-sidebar.component';
import { ConsultantsProfileDisplayComponent } from './pages/consultants-profile-display/consultants-profile-display.component';
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
    ConsultantsProfileDisplayComponent,
    ConsultantsSearchSidebarComponent
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
