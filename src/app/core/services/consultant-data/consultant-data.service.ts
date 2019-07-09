import { ConsultantSearch } from './../../models/consultantSearch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Consultant } from '@core/models/consultant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultantDataService {

  constructor(private http: HttpClient) { }

  private baseurl = environment.api + '/consultant';

  public getConsultants(): Observable<ConsultantSearch[]> {
    return this.http.get<ConsultantSearch[]>(this.baseurl);
  }

  public getConsultant(id: string): Observable<Consultant> {
    const consultant = this.baseurl + '/' + id;
    return this.http.get<Consultant>(consultant);
  }

  public createConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(this.baseurl, consultant);
  }

  public updateConsultant(consultant): Observable<Consultant> {
    
    // let consultant = {
    //   id: string;
    //   urlProfileImage: string;
    //   firstName: string;
    //   lastName: string;
    //   title: string;
    //   practice: string;
    //   status?: Status;
    //   email: string;
    //   username: string;
    //   address: Address;
    //   phone: number;
    //   certifications: Certification[];
    //   coreSkills: SelectedSkill[];
    //   technicalSkills: SelectedSkill[];
    //   education: Education[];
    //   experience: Experience[];
    // }
    delete consultant.education;
    delete consultant.eduOrCert0;
    delete consultant.endDate0;
    delete consultant.levelOfDegree0;
    delete consultant.school0;
    console.log("updateConsultant.consultant:", consultant)
    return this.http.put<Consultant>(this.baseurl, consultant);
  }

  public deleteConsultant(id: string): Observable < Consultant > {
  const deleteUrl = this.baseurl + '/' + id;
  return this.http.delete<Consultant>(deleteUrl);
}

}
