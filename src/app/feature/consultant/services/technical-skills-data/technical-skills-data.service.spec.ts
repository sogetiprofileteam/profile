import { TestBed } from '@angular/core/testing';

import { TechnicalSkillsService } from './technical-skills-data.service';

describe('TechnicalSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnicalSkillsService = TestBed.get(TechnicalSkillsService);
    expect(service).toBeTruthy();
  });
});
