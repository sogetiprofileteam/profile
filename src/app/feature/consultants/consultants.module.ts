import { NgModule } from '@angular/core';
import { ConsultantsSearchSidebarComponent } from './pages/consultants-search-sidebar/consultants-search-sidebar.component';
import { ConsultantsProfileDisplayComponent } from './pages/consultants-profile-display/consultants-profile-display.component';
import { CommonModule } from '@angular/common';

import {
  ConsultantsViewComponent,
  ConsultantsRoutingModule,
} from './index';

import { MatButtonModule, MatExpansionModule, MatCheckboxModule, MatDividerModule } from '@angular/material';
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
    MatDividerModule
  ],
  providers: [ConsultantsStoreService]
})
export class ConsultantsModule { }
