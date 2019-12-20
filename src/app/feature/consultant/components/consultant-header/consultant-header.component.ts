import { Consultant } from '@core/models';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ConsultantHeaderEditComponent } from '../consultant-header-edit/consultant-header-edit.component';
import { ConsultantPictureEditComponent } from '../consultant-picture-edit/consultant-picture-edit.component';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantHeaderComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;


  openEditHeaderDialog(): void {
    this.dialog.open(ConsultantHeaderEditComponent);
  }

  openEditPictureDialog() {
    this.dialog.open(ConsultantPictureEditComponent, { width: '500px' });
  }

}
