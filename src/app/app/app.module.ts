import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PortfolioItemModule } from '../portfolio-item/portfolio-item.module';
import { SearchModule } from '../search/search.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SearchModule,
    PortfolioItemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
