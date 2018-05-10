import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileAddComponent } from '../profile/profile-add/profile-add.component';
import { SearchComponent } from '../search/search.component';
import { ProfileComponent } from '../profile/profile-view/profile.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'add', component: ProfileAddComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile/:id' , component: ProfileComponent },
  // { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
