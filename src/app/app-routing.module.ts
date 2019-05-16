import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/consultants', pathMatch: 'full'},
  {
    path: 'consultants',
    loadChildren: './feature/consultants/consultants.module#ConsultantsModule'
  },
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
