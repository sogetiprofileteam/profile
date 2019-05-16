import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultantsViewComponent } from './pages/consultants-view/consultants-view.component';

const routes: Routes = [
  { path: '', component: ConsultantsViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantsRoutingModule { }
