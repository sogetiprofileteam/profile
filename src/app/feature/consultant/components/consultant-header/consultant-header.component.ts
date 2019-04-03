import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantHeaderEditComponent } from '../consultant-header-edit/consultant-header-edit.component';

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

  openEditDialog(): void {
    this.dialog.open(ConsultantHeaderEditComponent, { width: '400px' });
  }

}
