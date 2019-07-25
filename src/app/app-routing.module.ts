import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent, pathMatch: 'full', canActivate: [AuthenticationGuard]}, // , redirectTo: '/consultants'
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
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
