import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioItemComponent } from './portfolio-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [PortfolioItemComponent],
  exports: [PortfolioItemComponent]
})
export class PortfolioItemModule { }
