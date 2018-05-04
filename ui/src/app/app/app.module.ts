import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app/app-routing.module';

import { AppComponent } from './app.component';

import { PortfolioAddModule } from '../portfolio-add/portfolio-add.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { SearchModule } from '../search/search.module';
import { PageNotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    PortfolioAddModule,
    SearchModule,
    PortfolioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
