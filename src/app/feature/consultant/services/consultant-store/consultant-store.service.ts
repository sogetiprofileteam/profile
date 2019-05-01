import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { ConsultantServiceModule } from '../../consultant-service.module';
import { ConsultantDataService } from '../consultant-data/consultant-data.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Consultant } from '@core/models';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class ConsultantStore {

  constructor(
    private consultantDataService: ConsultantDataService,
    private route: ActivatedRoute
  ) {}

  /** Consultant BehaviorSubject, allows late subscribers to get most recent data */
  private readonly _consultant = new BehaviorSubject<Consultant>(null);

  /** Consultant Observable to subscribe to for most recent state. */
  readonly consultant$ = this._consultant.asObservable();

  /** Getter of most recent BehaviorSubject content */
  private get consultant(): Consultant {
    return this._consultant.getValue();
  }

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
    }

    return consultantCopy;
  }

  /**
   * Sets the consultant observable to be used in the consultant feature.
   * Called once from the consultant-view page.
   */
  initConsultant(): Observable<Consultant> {
    const consultantId = this.getConsultantIdFromRoute();

    return this.getConsultant(consultantId)
      .pipe(
        tap(consultant => this._consultant.next(consultant))
      );
  }

  /**
   * Grabs a the consultant's ID from the route snapshot query params.
   */
  private getConsultantIdFromRoute(): string {
    return this.route.snapshot.queryParams.id as string;
  }

  /**
   * Calls the data service to fetch consultant object.
   * @param id Id of the desired consultant.
   */
  private getConsultant(id: string): Observable<Consultant> {
    return this.consultantDataService.getConsultant(id);
  }

  /**
   * Updates the consultant by making an HTTP call to the api
   * and then the consultant Observable emits the updated value.
   * @param id ID of the consultant to be updated.
   * @param data A partial Consultant object containing the data to update.
   */
  updateConsultant(data: Partial<Consultant>): Observable<HttpResponse<any>> {
    // TODO: error handling? Leave error handling implementation up to consumer?
    return this.consultantDataService.updateConsultant(this.consultant.id, data)
      .pipe(
        tap(() => {
          const updatedConsultant = this.updatedConsultantFactory(data);
          this._consultant.next(updatedConsultant);
        })
      );
  }
}
