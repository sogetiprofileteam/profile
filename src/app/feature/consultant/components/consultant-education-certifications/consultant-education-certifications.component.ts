import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { MatDialog } from '@angular/material';
import {
  ConsultantEducationCertificationsFormComponent
} from './consultant-education-certifications-form/consultant-education-certifications-form.component';
import {
  ConsultantEducationCertificationsDeleteDialogComponent
} from './consultant-education-certifications-delete-dialog/consultant-education-certifications-delete-dialog.component';
import { Education, Certification } from '@core/models';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-consultant-education-certifications',
  templateUrl: './consultant-education-certifications.component.html',
  styleUrls: ['./consultant-education-certifications.component.scss']
})
export class ConsultantEducationCertificationsComponent implements OnInit, OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;
  _destroy$ = new Subject();

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  openAddEducationCertificationDialog() {
    this.dialog.open(ConsultantEducationCertificationsFormComponent)
      .afterClosed()
      .pipe(
        switchMap(data => {
          console.log(data);
          return data
            ? this.consultantStore.updateConsultant( { [data.type]: data.eduOrCert } )
            : of(null);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  openEditEducationCertificationDialog(objectToEdit: Education | Certification, i: number, eduOrCert: string) {
    this.dialog.open(ConsultantEducationCertificationsFormComponent, { data: { eduOrCert: objectToEdit, index: i, type: eduOrCert} })
      .afterClosed()
      .pipe(
        switchMap(data => {
          console.log(data);

          return data
            ? this.consultantStore.updateConsultant( { [data.type]: data.eduOrCert } )
            : of(null);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  openDeleteEducationCertificationDialog(index: number, eduOrCert: string) {
    this.dialog.open(ConsultantEducationCertificationsDeleteDialogComponent, { width: '400px' })
      .afterClosed()
      .pipe(
        switchMap(shouldDelete => shouldDelete ? this.deleteEduOrCert(index, eduOrCert) :  of(null)),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  private deleteEduOrCert(selectedIndex: number, eduOrCert: string) {
    const updatedEduOrCert = [
      ...this.consultantStore.consultant[eduOrCert]
    ];

    updatedEduOrCert.splice(selectedIndex, 1);

    return this.consultantStore
      .updateConsultant({ [eduOrCert]: updatedEduOrCert })
      .pipe(takeUntil(this._destroy$));
  }

}
