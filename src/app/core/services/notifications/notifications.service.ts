import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(public snackbar: MatSnackBar) {}

  openSavedSnackBar() {
    const snackbarRef = this.snackbar.open(
      'Consultant Profile Saved Successfully!',
      null,
      {
        horizontalPosition: 'end',
        panelClass: ['green-snackbar'],
        duration: 3000
      }
    );
    return snackbarRef;
  }

  openErrorSavingSnackBar() {
    const snackbarRef = this.snackbar.open(
      'There was an error saving consultant',
      null,
      {
        horizontalPosition: 'end',
        panelClass: ['red-snackbar'],
        duration: 3000
      }
    );
    return snackbarRef;
  }

  openUpdatedSnackBar() {
    const snackbarRef = this.snackbar.open('Consultant Updated', null, {
      horizontalPosition: 'end',
      panelClass: ['green-snackbar'],
      duration: 3000
    });
    return snackbarRef;
  }

  openErrorUpdatingSnackBar() {
    const snackbarRef = this.snackbar.open(
      'There was an error updating consultant',
      null,
      {
        horizontalPosition: 'end',
        panelClass: ['red-snackbar'],
        duration: 3000
      }
    );
    return snackbarRef;
  }

  openDeletedExperienceSnackBar() {
    const snackbarRef = this.snackbar.open('Experience Deleted', null, {
      horizontalPosition: 'end',
      panelClass: ['red-snackbar'],
      duration: 3000
    });

    return snackbarRef;
  }

  openDeletedEducationSnackBar() {
    const snackbarRef = this.snackbar.open('Education Deleted', null, {
      horizontalPosition: 'end',
      panelClass: ['red-snackbar'],
      duration: 3000
    });

    return snackbarRef;
  }

  openUpdatedPictureSnackBar() {
    const snackbarRef = this.snackbar.open(
      'Profile Picture Uploaded Successfully!',
      null,
      {
        horizontalPosition: 'end',
        panelClass: ['green-snackbar'],
        duration: 3000
      }
    );
    return snackbarRef;
  }

  openErrorUpdatingPictureSnackBar() {
    const snackbarRef = this.snackbar.open(
      'Error: Profile picture did not upload!',
      null,
      {
        horizontalPosition: 'end',
        panelClass: ['red-snackbar'],
        duration: 3000
      }
    );
    return snackbarRef;
  }

  openAddingSkillSnackBar() {
    const snackbarRef = this.snackbar.open(
      'Skills updated!',
      null,
      {
        horizontalPosition: 'end',
        panelClass: ['green-snackbar'],
        duration: 3000
      }
    );
    return snackbarRef;
  }

  openErrorAddingSkillSnackBar() {
    const snackbarRef = this.snackbar.open(
      'Error updating skills',
      null,
      {
        horizontalPosition: 'end',
        panelClass: ['red-snackbar'],
        duration: 3000
      }
    );
    return snackbarRef;
  }
}
