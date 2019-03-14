import { Component, OnInit, Inject } from '@angular/core';
import { of } from 'rxjs';
import { mockConsultant } from '@core/mocks/mock-consultant';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConsultantHeaderEditDialog } from '../consultant-header-edit/consultant-header-edit-dialog.component';
import { Consultant } from '@core/models';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.scss']
})
export class ConsultantHeaderComponent implements OnInit {

  consultant: Consultant;

  constructor(public dialog: MatDialog) {}

  consultant$ = of(mockConsultant);

  ngOnInit() {
    this.consultant$.subscribe( data =>{
      this.consultant = data;
  });
 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConsultantHeaderEditDialog, {
      width: '500px',
      data: {urlLinkedIn: this.consultant.urlLinkedIn,
         urlGitHub: this.consultant.urlGitHub, 
         urlWordpress: this.consultant.urlWordpress, 
         urlPersonal: this.consultant.urlPersonal}
    });

    dialogRef.afterClosed().subscribe((result:Consultant) => {
      console.log('The dialog was closed');
      if(result){
        this.consultant = result;
        console.log(result);
        console.log(this.consultant);
      }
      
    });
  }

}
