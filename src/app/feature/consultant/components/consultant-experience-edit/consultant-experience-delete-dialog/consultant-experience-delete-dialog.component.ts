/*
 *SUMMARY: This is for the Dialog box that shows up once user clicks "Delete" from the experience-edit component
*/
import { ConsultantExperienceEditComponent } from './../consultant-experience-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Input, Inject } from '@angular/core';


@Component({
  selector: 'app-consultant-experience-delete-dialog',
  templateUrl: './consultant-experience-delete-dialog.component.html',
  styleUrls: ['./consultant-experience-delete-dialog.component.scss']
})
export class ConsultantExperienceDeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private dialogRef: MatDialogRef<ConsultantExperienceEditComponent>,
  ) {}

  public confirmMessage:string;

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close(false);
  }

}



