import { Component, OnInit, Input, Output } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Experience } from '@core/models';
import { MatDialog, MatDialogConfig, DialogPosition, MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';
import { tap, takeUntil } from 'rxjs/operators';
import { ConsultantExperienceEditComponent } from '../consultant-experience-edit/consultant-experience-edit.component';
import { ConsultantExperienceCreateComponent } from '../consultant-experience-create/consultant-experience-create.component';

@Component({
  selector: 'app-consultant-experience',
  templateUrl: './consultant-experience.component.html',
  styleUrls: ['./consultant-experience.component.scss']
})
export class ConsultantExperienceComponent implements OnInit {
  @Input() selectedIndex: number;
  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog
  ) { }

  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }

  openCreateExperienceDialog() {
    this.dialog.open(ConsultantExperienceCreateComponent);
  }

  openEditExperienceDialog(selectedIndex:number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
        index: selectedIndex
    };
    this.selectedIndex = selectedIndex;

    const dialogRef =  this.dialog.open(ConsultantExperienceEditComponent, dialogConfig);
    console.log('Selectd Index: ' + selectedIndex);
    console.log('this.selectedIndex: ' + this.selectedIndex);
    console.log('Dialoag ref: ' + dialogRef.id);
  }

}
