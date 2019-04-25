import { Injectable } from '@angular/core';
import { ConsultantServiceModule } from '../../consultant-service.module';

import { Skill, SkillType } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantSkillDataService {

  constructor(
    private http: HttpClient
  ) { }

  addNewSkill(name: string, type: SkillType): Observable<Skill> {
    // TODO: change to http call later
    const mockNewSkill: Skill = {
      id: Math.floor((Math.random() * 100)).toString(),
      name: name,
      type: type
    }
    this.mockSkills.push(mockNewSkill);
    return of(mockNewSkill);
  }

  getCoreSkills(): Observable<Skill[]> {
    return of(this.mockSkills.filter(skill => skill.type === 2))
  }

  getTechnicalSkills(): Observable<Skill[]> {
    return of(this.mockSkills.filter(skill => skill.type === 1))
  }

  mockSkills: Skill[] = [
    {
      id: '10',
      name: 'Angular',
      type: 1
    },
    {
      id: '20',
      name: 'TypeScript',
      type: 1
    },
    {
      id: '30',
      name: 'CSS',
      type: 1
    },
    {
      id: '40',
      name: 'AWS',
      type: 1
    },
    {
      id: '1',
      name: 'Software development',
      type: 2
    },
    {
      id: '2',
      name: 'Time management',
      type: 2
    },
    {
      id: '3',
      name: 'Prioritizing',
      type: 2
    },
    {
      id: '4',
      name: 'Communication',
      type: 2
    },
    {
      id: '5',
      name: 'SDLC',
      type: 2
    },
    {
      id: '7',
      name: 'Teamwork',
      type: 2
    },
    {
      id: '8',
      name: 'UI Designer',
      type: 2
    },
    {
      id: '9',
      name: 'UX Designer',
      type: 2
    }
  ]
}
