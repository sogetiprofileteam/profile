import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ConsultantsViewComponent,
  ConsultantsRoutingModule
} from './index';

import { MatButtonModule } from '@angular/material/button';
import { ConsultantsStoreService } from './services/consultants-store/consultants-store.service';

@NgModule({
  declarations: [
    ConsultantsViewComponent,
  ],
  imports: [
    CommonModule,
    ConsultantsRoutingModule,
    MatButtonModule
  ],
  providers: [ConsultantsStoreService]
})
export class ConsultantsModule { }
