import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ConsultantSummaryEditComponent } from '../consultant-summary-edit/consultant-summary-edit.component';

@Component({
  selector: 'app-consultant-summary',
  templateUrl: './consultant-summary.component.html',
  styleUrls: ['./consultant-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConsultantSummaryComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;

  openEditSummaryDialog(): void {
    this.dialog.open(ConsultantSummaryEditComponent);
  }

}
