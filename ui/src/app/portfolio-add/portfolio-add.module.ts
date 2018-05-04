import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PortfolioAddComponent } from './portfolio-add.component';

import { PortfolioAddService } from './portfolio-add.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PortfolioAddComponent],
  exports: [PortfolioAddComponent],
  providers: [PortfolioAddService]
})
export class PortfolioAddModule { }
