import { TestBed, inject } from '@angular/core/testing';

import { PortfolioAddService } from './portfolio-add.service';

describe('PortfolioAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioAddService]
    });
  });

  it('should be created', inject([PortfolioAddService], (service: PortfolioAddService) => {
    expect(service).toBeTruthy();
  }));
});
