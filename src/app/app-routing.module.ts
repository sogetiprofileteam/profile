import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/consultants', pathMatch: 'full'},
  {
    path: 'consultants',
    loadChildren: () => import('./feature/consultants/consultants.module').then(m => m.ConsultantsModule)
  },
  {
    path: 'consultant',
    loadChildren: () => import('./feature/consultant/consultant.module').then(m => m.ConsultantModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
