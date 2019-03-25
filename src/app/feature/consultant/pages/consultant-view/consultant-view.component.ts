import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantViewComponent implements OnDestroy {

private _destroy$ = new Subject();

  constructor(
    private consultantStore: ConsultantStore
  ) {
    this.consultantStore.initConsultant()
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
