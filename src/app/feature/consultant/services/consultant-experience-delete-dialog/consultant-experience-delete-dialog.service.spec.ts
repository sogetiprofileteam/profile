import { TestBed } from '@angular/core/testing';

import { ConsultantExperienceDeleteDialogService } from './consultant-experience-delete-dialog.service';

describe('ConsultantExperienceDeleteDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultantExperienceDeleteDialogService = TestBed.get(ConsultantExperienceDeleteDialogService);
    expect(service).toBeTruthy();
  });
});
