import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Consultant } from 'models/consultant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private http: HttpClient) { }

  private baseurl = environment.api + '/consultant';

  public getConsultants(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(this.baseurl);
  }

  public getConsultant(id: string): Observable<Consultant> {
    const consultant = this.baseurl + '/' + id;
    return this.http.get<Consultant>(consultant);
  }

  public createConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(this.baseurl, consultant);
  }

  public updateConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(this.baseurl, consultant);
  }

  public deleteConsultant(id: string): Observable<Consultant> {
    const deleteUrl = this.baseurl + '/' + id;
    return this.http.delete<Consultant>(deleteUrl);
  }

}
