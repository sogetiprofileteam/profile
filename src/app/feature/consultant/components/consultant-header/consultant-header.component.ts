import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantHeaderEditComponent } from '../consultant-header-edit/consultant-header-edit.component';
import { Subscription } from 'rxjs';
import { ConsultantDataService } from '@feature/consultant/services/consultant-data/consultant-data.service';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantHeaderComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
    private consultantService: ConsultantDataService
  ) { }

  consultant$ = this.consultantStore.consultant$;
  consultantapi;
  address = [];
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.consultantService.getConsultant(1).subscribe(data => {
      this.consultantapi = data;
      this.address = data.address;
    });
  }

  openEditDialog(): void {
    this.dialog.open(ConsultantHeaderEditComponent, { width: '400px' });
  }

}
