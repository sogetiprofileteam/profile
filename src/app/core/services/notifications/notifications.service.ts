import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(public snackbar: MatSnackBar) {}

  notificationsBar(message:string, style: 'success' | 'error' | 'warn') {
    const snackbarRef = this.snackbar.open(message,null, {
      horizontalPosition: 'end',
      panelClass: [style],
      duration: 3000

    })
    return snackbarRef;
  }
}
