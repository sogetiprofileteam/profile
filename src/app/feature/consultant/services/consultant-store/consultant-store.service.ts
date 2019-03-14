import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsultantServiceModule } from '../../consultant-service.module';
import { ConsultantDataService } from '../consultant-data/consultant-data.service';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { Consultant } from '@core/models';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantStore implements OnDestroy {

  private readonly _consultant = new BehaviorSubject<Consultant>(null);

  readonly consultant$ = this._consultant.asObservable();

  private get consultant(): Consultant {
    return this._consultant.getValue();
  }

  private _destroy$ = new Subject();

  constructor(
    private consultantDataService: ConsultantDataService,
    private route: ActivatedRoute
  ) {}

  initConsultant() {
    const consultantId = this.getConsultantIdFromRoute();

    this.getConsultant(consultantId)
      .pipe(
        takeUntil(this._destroy$),
        tap(consultant => this._consultant.next(consultant))
      ).subscribe();
  }

  private getConsultantIdFromRoute(): number {
    return this.route.snapshot.queryParams.id as number;
  }

  private getConsultant(id: number): Observable<Consultant> {
    return this.consultantDataService.getConsultant(id);
  }

  updateConsultant() {
    // Call data service
    // next behaviorsubject

    // TODO: replace with actual updating
    const updatedConsultant = {
      ...this.consultant
    };
    updatedConsultant.firstName = 'Janay';
    this._consultant.next(updatedConsultant);
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
