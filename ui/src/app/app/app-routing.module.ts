import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent }   from './app.component';
import { PortfolioAddComponent }   from '../portfolio-add/portfolio-add.component';
import { SearchComponent } from '../search/search.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'add', component: PortfolioAddComponent },
  { path: 'search', component: SearchComponent }
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