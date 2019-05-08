import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultant } from '@core/models/consultant';
import { ConsultantsStoreService } from '../../services/consultants-store/consultants-store.service';

@Component({
  selector: 'app-consultants-view',
  templateUrl: './consultants-view.component.html',
  styleUrls: ['./consultants-view.component.scss']
})
export class ConsultantsViewComponent {

  constructor(private consultantsService: ConsultantsStoreService) { }

  consultants$: Observable<Consultant[]> = this.consultantsService.consultants$;

}
