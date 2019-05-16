import { TestBed } from '@angular/core/testing';

import { CoreSkillsService } from './core-skills.service';

describe('CoreSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreSkillsService = TestBed.get(CoreSkillsService);
    expect(service).toBeTruthy();
  });
});
