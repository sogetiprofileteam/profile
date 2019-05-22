import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultant } from '@core/models/consultant';
import { ConsultantsStoreService } from '../../services/consultants-store/consultants-store.service';

@Component({
  selector: 'app-consultants-view',
  templateUrl: './consultants-view.component.html',
  styleUrls: ['./consultants-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantsViewComponent {

  constructor(private consultantsService: ConsultantsStoreService) {
    this.consultantsService.initConsultants();
  }

  consultants$: Observable<Consultant[]> = this.consultantsService.consultants$;

}
