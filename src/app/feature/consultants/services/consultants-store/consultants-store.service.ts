import { Injectable, OnDestroy } from '@angular/core';

import { ConsultantDataService } from '@core/services/consultant-data/consultant-data.service';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { Consultant } from '@core/models';
import { take, takeUntil } from 'rxjs/operators';

@Injectable()
export class ConsultantsStoreService implements OnDestroy {

  constructor(private consultantDataService: ConsultantDataService) {
    this.initConsultants();
  }

  private _destroy$ = new Subject();

  /** Consultants ReplaySubject allows late subscribers to get most recent data */
  private readonly _consultants = new ReplaySubject<Consultant[]>(1);

  /** Consultants Observable to subscribe to for most recent state. */
  readonly consultants$ = this._consultants.asObservable();

  /**
   * Sets the consultants observable to be used in the consultant feature.
   */
  initConsultants(): void {
    this.getConsultants()
      .pipe(
        take(1),
        takeUntil(this._destroy$)
      ).subscribe(consultants => this._consultants.next(consultants));
  }

  /**
   * Calls the data service to fetch consultants.
   */
  private getConsultants(): Observable<Consultant[]> {
    return this.consultantDataService.getConsultants();
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
