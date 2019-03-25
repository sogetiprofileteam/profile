import { TestBed } from '@angular/core/testing';

import { ConsultantStore } from './consultant-store.service';

describe('ConsultantStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultantStore = TestBed.get(ConsultantStore);
    expect(service).toBeTruthy();
  });
});
