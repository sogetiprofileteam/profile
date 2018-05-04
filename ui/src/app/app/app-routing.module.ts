import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent }   from './app.component';
import { PortfolioAddComponent }   from '../portfolio-add/portfolio-add.component';
import { SearchComponent } from '../search/search.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'add', component: PortfolioAddComponent },
  { path: 'search', component: SearchComponent },
  { path: 'portfolio' , component: PortfolioComponent },
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