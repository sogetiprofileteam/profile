import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PortfolioItemModule } from '../portfolio-item/portfolio-item.module';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PortfolioItemModule
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers: [SearchService]
})
export class SearchModule { }
