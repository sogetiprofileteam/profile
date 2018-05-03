import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioAddComponent } from './portfolio-add.component';

import { PortfolioAddService } from './portfolio-add.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PortfolioAddComponent],
  exports: [PortfolioAddComponent],
  providers: [PortfolioAddService]
})
export class PortfolioAddModule { }
