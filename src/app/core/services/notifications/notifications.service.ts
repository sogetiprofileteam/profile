import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public snackbar: MatSnackBar) { }

  openSavedSnackBar(){
    const snackbarRef = this.snackbar.open('Consultant Saved', null, {
        horizontalPosition: 'end',
        panelClass: ['red-snackbar'],
        duration: 3000
    })
    console.log("SnackBar Here!");
    return snackbarRef;
  }

  openErrorSavingSnackBar(){
    const snackbarRef = this.snackbar.open('There was an error saving consultant', null, {
        horizontalPosition: 'end',
        panelClass: ['red-snackbar'],
        duration: 3000
    })
    console.log("SnackBar Error Here!");
    return snackbarRef;
  }

  openUpdatedSnackBar(){
    const snackbarRef = this.snackbar.open('Consultant Updated', null, {
        horizontalPosition: 'end',
        panelClass: ['green-snackbar'],
        duration: 3000
    })
    console.log("SnackBar Here!");
    return snackbarRef;
  }

  openErrorUpdatingSnackBar(){
    const snackbarRef = this.snackbar.open('There was an error updating consultant', null, {
        horizontalPosition: 'end',
        panelClass: ['red-snackbar'],
        duration: 3000
    })
    console.log("SnackBar Error Here!");
    return snackbarRef;
  }

  openDeletedExperience(){
    const snackbarRef = this.snackbar.open('Deleted experience', null, {
        horizontalPosition: 'end',
        panelClass: ['green-snackbar'],
        duration: 3000
    })
    console.log("SnackBar Error Here!");
    return snackbarRef;
  }
}
