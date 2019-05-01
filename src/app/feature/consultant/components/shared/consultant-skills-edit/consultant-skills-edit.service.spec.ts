import { TestBed } from '@angular/core/testing';

import { ConsultantSkillsEditService } from './consultant-skills-edit.service';

describe('ConsultantSkillsEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultantSkillsEditService = TestBed.get(ConsultantSkillsEditService);
    expect(service).toBeTruthy();
  });
});
