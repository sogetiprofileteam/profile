import { Injectable } from '@angular/core';
import { ConsultantServiceModule } from '../../consultant-service.module';

import { Skill } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantSkillDataService {

  constructor(
    private http: HttpClient
  ) { }

  addNewSkill(name: string): Observable<Skill> {
    // TODO: change to http call later
    const mockNewSkill: Skill = {
      id: Math.floor((Math.random() * 100)).toString(),
      name: name
    }

    return of(mockNewSkill);
  }

  getCoreSkills(): Observable<Skill[]> {
    return of(mockCoreSkills)
  }

  getTechnicalSkills(): Observable<Skill[]> {
    return of(mockTechnicalSkills)
  }
}

export const mockCoreSkills: Skill[] = [
  {
    id: '1',
    name: 'Software development'
  },
  {
    id: '2',
    name: 'Time management'
  },
  {
    id: '3',
    name: 'Prioritizing'
  },
  {
    id: '4',
    name: 'Communication',
  },
  {
    id: '5',
    name: 'SDLC',
  },
  {
    id: '7',
    name: 'Teamwork',
  },
  {
    id: '8',
    name: 'UI Designer',
  },
  {
    id: '9',
    name: 'UX Designer'
  }
]

export const mockTechnicalSkills: Skill[] = [
  {
    id: '10',
    name: 'Angular'
  },
  {
    id: '20',
    name: 'TypeScript'
  },
  {
    id: '30',
    name: 'CSS'
  },
]