import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioItemComponent } from './portfolio-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PortfolioItemComponent],
  exports: [PortfolioItemComponent]
})
export class PortfolioItemModule { }
