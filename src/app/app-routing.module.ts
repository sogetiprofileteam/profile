import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantsComponent } from './feature/consultants/consultants.component';

const routes: Routes = [
  {path: '', redirectTo: '/consultants', pathMatch: 'full'},
  {path: 'consultants', component: ConsultantsComponent},
  {
    path: 'consultant',
    loadChildren: './feature/consultant/consultant.module#ConsultantModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
