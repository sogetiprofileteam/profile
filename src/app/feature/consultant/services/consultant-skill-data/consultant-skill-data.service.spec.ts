import { TestBed } from '@angular/core/testing';

import { ConsultantSkillDataService } from './consultant-skill-data.service';

describe('ConsultantSkillDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultantSkillDataService = TestBed.get(ConsultantSkillDataService);
    expect(service).toBeTruthy();
  });
});
