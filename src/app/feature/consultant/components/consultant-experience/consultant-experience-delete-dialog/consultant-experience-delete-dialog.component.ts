/*
 *SUMMARY: This is for the Dialog box that shows up once user clicks "Delete" from the experience-edit component
*/
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-consultant-experience-delete-dialog',
  templateUrl: './consultant-experience-delete-dialog.component.html',
  styleUrls: ['./consultant-experience-delete-dialog.component.scss']
})
export class ConsultantExperienceDeleteDialogComponent implements OnInit {

  private _destroy$ = new Subject();

  constructor(
    private dialogRef: MatDialogRef<ConsultantExperienceDeleteDialogComponent>,
  ) {}

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close(false);
  }

}



