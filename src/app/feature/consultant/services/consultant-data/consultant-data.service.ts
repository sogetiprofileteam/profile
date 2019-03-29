import { Injectable } from '@angular/core';
import { ConsultantServiceModule } from '@feature/consultant/consultant-service.module';

import { of, Observable } from 'rxjs';

import { Consultant } from '@core/models';
import { HttpResponse, HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantDataService {

  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.apiUrl}/consultant`;

  getConsultant(id: number): Observable<Consultant> {
    // ID parameter?
    return this.http.get<Consultant>(this.baseUrl);
  }

  updateConsultant(id: number, data: Partial<Consultant>): Observable<HttpResponse<any>> {
    // TODO: change to http call later
    const mockResponse = new HttpResponse({ status: 204 });
    return of(mockResponse);
  }
}
