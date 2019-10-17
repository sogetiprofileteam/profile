import { TestBed } from '@angular/core/testing';

import { ProfileImageService } from './profile-image.service';

describe('ProfileImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileImageService = TestBed.get(ProfileImageService);
    expect(service).toBeTruthy();
  });
});
