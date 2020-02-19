import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'consultant',
    loadChildren: () => import('./feature/consultant/consultant.module').then(m => m.ConsultantModule),
  },
  {
    path: 'consultants',
    loadChildren: () => import('./feature/consultants/consultants.module').then(m => m.ConsultantsModule),
  },
  {
    path: '',
    redirectTo: '/consultants',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/consultants',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
