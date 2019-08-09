/*
 *SUMMARY: This is for the Dialog box that shows up once user clicks "Delete" from the experience-edit component
*/
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  templateUrl: './experience-delete-dialog.component.html',
  styleUrls: ['./experience-delete-dialog.component.scss']
})
export class ExperienceDeleteDialogComponent implements OnInit {

  private _destroy$ = new Subject();

  constructor(
    private dialogRef: MatDialogRef<ExperienceDeleteDialogComponent>,
  ) {}

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close(false);
  }

}



