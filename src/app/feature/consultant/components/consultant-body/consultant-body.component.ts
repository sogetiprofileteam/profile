import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-body',
  templateUrl: './consultant-body.component.html',
  styleUrls: ['./consultant-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantBodyComponent {
}
