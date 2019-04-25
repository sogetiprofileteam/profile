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
  {
    id: '40',
    name: 'AWS'
  }
]

export const mockSkills = [
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