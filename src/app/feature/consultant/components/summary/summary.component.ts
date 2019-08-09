import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { SummaryEditComponent } from './summary-edit/summary-edit.component';

@Component({
  selector: 'app-consultant-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SummaryComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;

  openEditSummaryDialog(): void {
    this.dialog.open(SummaryEditComponent);
  }

}
