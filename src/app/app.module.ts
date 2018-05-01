import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PortfolioItemComponent } from './portfolio-item/portfolio-item.component';
import { SearchModule } from './search/search.module';
import { PortfolioItemModule } from './portfolio-item/portfolio-item.module';


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
