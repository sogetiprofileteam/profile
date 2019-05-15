import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ConsultantsViewComponent,
  ConsultantsServiceModule,
  ConsultantsRoutingModule
} from './index';

import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    ConsultantsViewComponent,
  ],
  imports: [
    CommonModule,
    ConsultantsServiceModule,
    ConsultantsRoutingModule,
    MatButtonModule
  ],
})
export class ConsultantsModule { }
