import { TestBed, inject } from '@angular/core/testing';

import { ProfileAddService } from './profile-add.service';

describe('ProfileAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileAddService]
    });
  });

  it('should be created', inject([ProfileAddService], (service: ProfileAddService) => {
    expect(service).toBeTruthy();
  }));
});
