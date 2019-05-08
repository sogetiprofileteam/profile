import { TestBed } from '@angular/core/testing';

import { ConsultantsStoreService } from './consultants-store.service';

describe('ConsultantsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultantsStoreService = TestBed.get(ConsultantsStoreService);
    expect(service).toBeTruthy();
  });
});
