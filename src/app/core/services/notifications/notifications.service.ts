import { MatDialog } from '@angular/material/dialog';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { isEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(public snackbar: MatSnackBar,   private dialog: MatDialog) {}


  notificationsBar(message:string, style: 'success' | 'error' | 'warn', duration?: number) {
    if(duration == null){
        duration = 3000;
    }
    const snackbarRef = this.snackbar.open(message,null, {
      horizontalPosition: 'end',
      panelClass: [style],
      duration: duration

    })
    return snackbarRef;
  }
}