import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantBodyComponent {
  constructor(private consultantStore: ConsultantStore) {}

  isNewConsultant = this.consultantStore.newConsultant;
}
