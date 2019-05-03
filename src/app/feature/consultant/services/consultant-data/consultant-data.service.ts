import { Injectable } from '@angular/core';
import { ConsultantServiceModule } from '@feature/consultant/consultant-service.module';

import { of, Observable } from 'rxjs';

import { Consultant } from '@feature/consultant/models';
import { HttpResponse, HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { mockConsultant } from '@feature/consultant/mocks/mock-consultant';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantDataService {

  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.apiUrl}/consultant`;

  getConsultant(id: string): Observable<Consultant> {
    // ID parameter?
    return of(mockConsultant).pipe(delay(1000)); // this.http.get<Consultant>(this.baseUrl).pipe(catchError(() => of(mockConsultant)));
  }

  updateConsultant(id: string, data: Partial<Consultant>): Observable<HttpResponse<any>> {
    // TODO: change to http call later
    const mockResponse = new HttpResponse({ status: 204 });
    return of(mockResponse).pipe(delay(1000));
  }
}
