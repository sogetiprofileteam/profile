import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantRoutingModule } from './consultant-routing.module';

import { ConsultantViewComponent } from './pages/consultant-view/consultant-view.component';
import { ConsultantHeaderComponent } from './components/consultant-header/consultant-header.component';
import { ConsultantBodyComponent } from './components/consultant-body/consultant-body.component';

@NgModule({
  declarations: [
    ConsultantViewComponent,
    ConsultantHeaderComponent,
    ConsultantBodyComponent
  ],
  imports: [
    CommonModule,
    ConsultantRoutingModule
  ]
})
export class ConsultantModule { }
