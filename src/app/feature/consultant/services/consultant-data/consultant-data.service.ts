import { Injectable } from '@angular/core';
import { ConsultantServiceModule } from '@feature/consultant/consultant-service.module';

import { of, Observable } from 'rxjs';

import { Consultant } from '@core/models';
import { HttpResponse, HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { mockConsultant } from '@core/mocks/mock-consultant';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantDataService {

  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.apiUrl}/consultant`;

  getConsultant(id: string): Observable<Consultant> {
    // ID parameter?
    return of(mockConsultant) // this.http.get<Consultant>(this.baseUrl).pipe(catchError(() => of(mockConsultant)));
  }

  updateConsultant(id: string, data: Partial<Consultant>): Observable<HttpResponse<any>> {
    // TODO: change to http call later
    const mockResponse = new HttpResponse({ status: 204 });
    return of(mockResponse);
  }
}
