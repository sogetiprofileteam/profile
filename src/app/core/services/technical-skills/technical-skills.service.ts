import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Skill } from 'models/index';

@Injectable({
  providedIn: 'root'
})
export class TechnicalSkillsService {

  constructor(private http: HttpClient) { }

  private baseurl = environment.api + '/techinicalskills';

  public getConsultants(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.baseurl);
  }

  public getConsultant(id: string): Observable<Skill> {
    const skill = this.baseurl + '/' + id;
    return this.http.get<Skill>(skill);
  }

  public createConsultant(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.baseurl, skill);
  }

  public updateConsultant(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.baseurl, skill);
  }

  public deleteConsultant(id: string): Observable<Skill> {
    const deleteUrl = this.baseurl + '/' + id;
    return this.http.delete<Skill>(deleteUrl);
  }
}
