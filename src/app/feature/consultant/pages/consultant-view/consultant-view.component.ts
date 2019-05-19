import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ ConsultantStore ]
})
export class ConsultantViewComponent {

  constructor( ) {
  }
}
