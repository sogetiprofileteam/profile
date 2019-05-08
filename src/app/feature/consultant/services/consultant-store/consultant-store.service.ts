import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsultantServiceModule } from '../../consultant-service.module';
import { ConsultantDataService } from '@core/services/consultant-data/consultant-data.service';

import { Observable, Subject, ReplaySubject } from 'rxjs';
import { tap, takeUntil, take } from 'rxjs/operators';

import { Consultant } from '@core/models';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantStore implements OnDestroy {

  constructor(
    private consultantDataService: ConsultantDataService,
    private route: ActivatedRoute
  ) {
    this.initConsultant();
  }

  private _destroy$ = new Subject();

  /** Consultant ReplaySubject allows late subscribers to get most recent data */
  private readonly _consultant = new ReplaySubject<Consultant>(1);

  /** Consultant Observable to subscribe to for most recent state. */
  readonly consultant$ = this._consultant.asObservable().pipe(tap(c => this.consultant = c));

  private consultant: Consultant;

  /**
   * Build a new consultant object from existing object with updated properties.
   * @param data A partial Consultant object containing the data to update
   */
  private updatedConsultantFactory(data: Partial<Consultant>): Consultant {
    // Copy current consultant to preserve immutability
    // WARNING: This approach may be flawed and needs to be looked at/reconsidered
    const consultantCopy = {
      ...this.consultant,
      ...data
    };

    return consultantCopy;
  }

  /**
   * Sets the consultant observable to be used in the consultant feature.
   */
  initConsultant(): void {
    const consultantId = this.getConsultantIdFromRoute();

    this.consultantDataService.getConsultant(consultantId)
      .pipe(
        take(1),
        takeUntil(this._destroy$)
      ).subscribe(consultant => this._consultant.next(consultant[0]));
  }

  /**
   * Grabs a the consultant's ID from the route snapshot query params.
   */
  private getConsultantIdFromRoute(): string {
    return this.route.snapshot.queryParams.id as string;
  }

  /**
   * Updates the consultant by making an HTTP call to the api
   * and then the consultant Observable emits the updated value.
   * @param id ID of the consultant to be updated.
   * @param data A partial Consultant object containing the data to update.
   */
  updateConsultant(data: Partial<Consultant>): Observable<Consultant> {
    // TODO: error handling? Leave error handling implementation up to consumer?
    const updatedConsultant = this.updatedConsultantFactory(data);

    return this.consultantDataService.updateConsultant(updatedConsultant)
      .pipe(
        tap(consultantRes => {
          this._consultant.next(consultantRes);
        })
      );
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
