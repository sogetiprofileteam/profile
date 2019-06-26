import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { ConsultantExperienceDeleteDialogComponent } from '@feature/consultant/components/consultant-experience-edit/consultant-experience-delete-dialog/consultant-experience-delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConsultantExperienceDeleteDialogService {

  constructor( private dialog: MatDialog) { }

  openDeleteDialog(msg: string) {
   return this.dialog.open(ConsultantExperienceDeleteDialogComponent, {
        width: '390px',
        panelClass: 'confirm-dialog-container',
        disableClose: true,
        position: {top: "10px"},
        data: {
          message: msg
        }
    });
  }
}
