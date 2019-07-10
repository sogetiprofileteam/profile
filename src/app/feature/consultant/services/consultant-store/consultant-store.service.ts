import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConsultantDataService } from '@core/services/consultant-data/consultant-data.service';

import { Observable, Subject, ReplaySubject, of } from 'rxjs';
import { tap, takeUntil, take } from 'rxjs/operators';

import { Consultant } from '@core/models';

export const blankConsultant: Consultant = {
  id: null,
  urlProfileImage: null,
  firstName: 'First',
  lastName: 'Last',
  title: 'Title',
  practice: 'Practice',
  email: 'Email',
  status: null,
  address: {
      lineOne: '10900 Stonelake Blvd. Suite 195',
      city: 'Austin',
      state: 'TX',
      zipCode: 78759
  },
  phone: 1234567890,
  urlLinkedIn: null,
  urlGitHub: null,
  urlWordpress: null,
  urlPersonal: null,
  coreSkills: [],
  technicalSkills: [],
  certifications: [],
  education: [],
  experience: []
};

@Injectable()
export class ConsultantStore implements OnDestroy {

  constructor(
    private consultantDataService: ConsultantDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private _destroy$ = new Subject();

  /** Consultant ReplaySubject allows late subscribers to get most recent data */
  private readonly _consultant$ = new ReplaySubject<Consultant>(1);

  /** Consultant Observable to subscribe to for most recent state. */
  readonly consultant$ = this._consultant$.asObservable().pipe(tap(c => this._consultant = c));

  private _consultant: Consultant;

  /** Most recent consultant object */
  get consultant() {
    return this._consultant;
  }

  private _newConsultant: boolean;

  get newConsultant() {
    return this._newConsultant;
  }

  /**
   * Build a new consultant object from existing object with updated properties.
   * @param data A partial Consultant object containing the data to update
   */
  private updatedConsultantFactory(data: Partial<Consultant>): Consultant {
    // Copy current consultant to preserve immutability
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

    if (consultantId) {
      this._newConsultant = false;
      this.consultantDataService.getConsultant(consultantId)
        .pipe(
          take(1),
          takeUntil(this._destroy$)
        ).subscribe(consultant => this._consultant$.next(consultant));
    } else {
      this._newConsultant = true;
      this._consultant$.next(blankConsultant);
    }

  }

  /**
   * Grabs a the consultant's ID from the route snapshot query params.
   */
  private getConsultantIdFromRoute(): string {
    return this.route.snapshot.queryParams.id as string;
  }

  /**
   * Updates the consultant.
   * If it's a new consultant it doesn't save it to the DB (we want
   * explicitly add when the user chooses to), if it's an existing
   * consultant it will be saved to DB.
   * @param data A partial Consultant object containing the data to update.
   */
  updateConsultant(data: Partial<Consultant>): Observable<Consultant | null> {
    // TODO: error handling? Leave error handling implementation up to consumer?
    const updatedConsultant = this.updatedConsultantFactory(data);
    if (!this.newConsultant) {
      return this.saveToDatabase(updatedConsultant);
    } else {
      this._consultant$.next(updatedConsultant);
      return of(null);
    }
  }

  /**
   * Call to send current Consultant object to DB.
   * Only call this when the edit component is configured to add a new consultant.
   */
  addNewConsultant() {
    if (this.newConsultant) {
      console.log('Adding new consultant using (Save function) to the database!: consultant-store.service');
      this.saveToDatabase(this.consultant)
        .subscribe(consultant => {
          this.router.navigate([ '/consultants']);
        });
    }
  }

  /**
   * Saves consultant to DB.
   * @param consultant object to save to DB.
   */
  private saveToDatabase(consultant: Consultant): Observable<Consultant> {
    if (consultant.id !== null) {
      console.log('Saving update to the database!: consultant-store.service');
      return this.consultantDataService.updateConsultant(consultant)
        .pipe(tap(res => this._consultant$.next(consultant)));
    } else {
      console.log('Saving new consultant to the database!: consultant-store.service');
      return this.consultantDataService.createConsultant(consultant)
        .pipe(tap(res => this._consultant$.next(consultant)));
    }

  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
