import { TestBed } from '@angular/core/testing';

import { SkillsDataService } from './skills-data.service';

describe('SkillsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillsDataService = TestBed.get(SkillsDataService);
    expect(service).toBeTruthy();
  });
});
