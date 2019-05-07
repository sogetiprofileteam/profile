import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Skill } from 'models/index';
import { ConsultantServiceModule } from '@feature/consultant/consultant-service.module';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class TechnicalSkillsService {

  constructor(private http: HttpClient) { }

  private baseurl = environment.api + '/techinicalskills';

  public getTechnicalSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.baseurl);
  }

  public getTechnicalSkill(id: string): Observable<Skill> {
    const skill = this.baseurl + '/' + id;
    return this.http.get<Skill>(skill);
  }

  public createTechnicalSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.baseurl, skill);
  }

  public updateTechnicalSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.baseurl, skill);
  }

  public deleteTechnicalSkill(id: string): Observable<Skill> {
    const deleteUrl = this.baseurl + '/' + id;
    return this.http.delete<Skill>(deleteUrl);
  }
}
