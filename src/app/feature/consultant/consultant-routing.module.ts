import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultantViewComponent } from './pages/consultant-view/consultant-view.component';

const routes: Routes = [
  { path: '', component: ConsultantViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantRoutingModule { }
