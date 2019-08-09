import { Component, OnInit } from '@angular/core';

import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { MatDialog } from '@angular/material';

import { Experience } from '@core/models';
import { ConsultantStore } from '../../services/consultant-store/consultant-store.service';
import {
  ExperienceDeleteDialogComponent
} from './experience-delete-dialog/experience-delete-dialog.component';
import { ExperienceFormComponent } from './experience-form/experience-form.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog
  ) { }

  private _destroy$ = new Subject();
  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }

  openCreateExperienceDialog() {
    this.dialog
      .open(ExperienceFormComponent)
      .afterClosed()
      .pipe(
        switchMap(updatedExperience => {
          return updatedExperience
            ? this.consultantStore.updateConsultant( { experience: updatedExperience } )
            : of(null);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  openEditExperienceDialog(selectedExperience: Experience, selectedIndex: number) {
    this.dialog
      .open(ExperienceFormComponent, { data: { experience: selectedExperience, index: selectedIndex } })
      .afterClosed()
      .pipe(
        switchMap(updatedExperience => {
          return updatedExperience
            ? this.consultantStore.updateConsultant( { experience: updatedExperience } )
            : of(null);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  openDeleteExperienceDialog(selectedIndex: number) {
    this.dialog
      .open(ExperienceDeleteDialogComponent, { width: '400px', data: { index: selectedIndex } })
      .afterClosed()
      .pipe(
        switchMap(shouldDelete => shouldDelete ? this.deleteExperience(selectedIndex) :  of(null)),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }


  private deleteExperience(selectedIndex: number) {
    const updatedExperience = [
      ...this.consultantStore.consultant.experience
    ];

    updatedExperience.splice(selectedIndex, 1);

    return this.consultantStore
      .updateConsultant({ experience: updatedExperience })
      .pipe(takeUntil(this._destroy$));
  }
}
