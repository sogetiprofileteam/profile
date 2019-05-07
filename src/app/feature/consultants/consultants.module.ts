import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ConsultantsViewComponent,
  ConsultantsServiceModule,
  ConsultantsRoutingModule
} from './index';


@NgModule({
  declarations: [
    ConsultantsViewComponent,
  ],
  imports: [
    CommonModule,
    ConsultantsServiceModule,
    ConsultantsRoutingModule
  ],
})
export class ConsultantModule { }
