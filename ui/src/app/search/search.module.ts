import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';

import { PortfolioItemModule } from '../portfolio-item/portfolio-item.module';

@NgModule({
  imports: [
    CommonModule,
    PortfolioItemModule
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule { }
