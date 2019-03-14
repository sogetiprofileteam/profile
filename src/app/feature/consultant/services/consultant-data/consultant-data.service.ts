import { Injectable } from '@angular/core';
import { ConsultantServiceModule } from '@feature/consultant/consultant-service.module';

import { of, Observable } from 'rxjs';

import { Consultant } from '@core/models';
import { mockConsultant } from '@core/mocks/mock-consultant';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantDataService {

  constructor() { }

  getConsultant(id: number): Observable<Consultant> {
    // TODO: change to http call later
    return of(mockConsultant);
  }

  updateConsultant(consultant: Consultant) {

  }
}
