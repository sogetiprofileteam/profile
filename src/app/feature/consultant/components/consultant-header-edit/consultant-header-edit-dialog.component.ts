import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  urlLinkedIn: string;
  urlGitHub: string;
  urlWordpress: string;
  urlPersonal: string;
}

@Component({
    selector: 'consultant-header-edit-dialog',
    templateUrl: 'consultant-header-edit-dialog.component.html',
    styleUrls: ['consultant-header-edit.component.scss']
  })
  export class ConsultantHeaderEditDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ConsultantHeaderEditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }