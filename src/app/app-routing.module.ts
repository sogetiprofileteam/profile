import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular'

const routes: Routes = [
  {path: '', redirectTo: '/consultants', pathMatch: 'full', canActivate: [MsalGuard]},
  {
    path: 'consultants',
    loadChildren: () => import('./feature/consultants/consultants.module').then(m => m.ConsultantsModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'consultant',
    loadChildren: () => import('./feature/consultant/consultant.module').then(m => m.ConsultantModule),
    canActivate: [MsalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
