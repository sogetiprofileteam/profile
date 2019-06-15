/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExportProfileService } from './export-profile.service';

describe('Service: ExportProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportProfileService]
    });
  });

  it('should ...', inject([ExportProfileService], (service: ExportProfileService) => {
    expect(service).toBeTruthy();
  }));
});
