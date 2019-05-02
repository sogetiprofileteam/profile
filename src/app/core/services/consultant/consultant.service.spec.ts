import { TestBed } from '@angular/core/testing';

import { ConsultantService } from './consultant.service';

describe('ConsultantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultantService = TestBed.get(ConsultantService);
    expect(service).toBeTruthy();
  });
});
