import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

import { PortfolioItemModule } from '../portfolio-item/portfolio-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PortfolioItemModule
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule { }
