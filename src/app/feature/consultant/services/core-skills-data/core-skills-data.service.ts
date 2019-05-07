import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Skill } from 'models/skill';
import { ConsultantServiceModule } from '@feature/consultant/consultant-service.module';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class CoreSkillsService {

  constructor(private http: HttpClient) { }

  private baseurl = environment.api + '/coreskills';

  public getCoreSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.baseurl);
  }

  public getCoreSkill(id: string): Observable<Skill> {
    const skill = this.baseurl + '/' + id;
    return this.http.get<Skill>(skill);
  }

  public createCoreSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.baseurl, skill);
  }

  public updateCoreSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.baseurl, skill);
  }

  public deleteCoreSkill(id: string): Observable<Skill> {
    const deleteUrl = this.baseurl + '/' + id;
    return this.http.delete<Skill>(deleteUrl);
  }
}
