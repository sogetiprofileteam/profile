import { TestBed } from '@angular/core/testing';

import { ConsultantDataService } from './consultant-data.service';

describe('ConsultantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultantDataService = TestBed.get(ConsultantDataService);
    expect(service).toBeTruthy();
  });
});
