import { Injectable } from '@angular/core';
import { ConsultantServiceModule } from '../../consultant-service.module';

import { Skill } from '@core/models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantSkillDataService {

  constructor(
    private http: HttpClient
  ) { }

  addNewSkill(name: string) {
    // TODO: change to http call later
    const mockResponse = new HttpResponse({ status: 204 });
    return of(mockResponse);
  }
}
