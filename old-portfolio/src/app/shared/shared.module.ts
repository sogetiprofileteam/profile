import { NgModule } from '@angular/core';
import { PracticeService } from './services/practice.service';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  providers: [
    PracticeService
  ],
  declarations: [
    ModalComponent
  ],
  exports: [
    ModalComponent
  ]
})
export class SharedModule { }
