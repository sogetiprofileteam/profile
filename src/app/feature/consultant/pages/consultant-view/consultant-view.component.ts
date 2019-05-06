import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultant-view',
  templateUrl: './consultant-view.component.html',
  styleUrls: ['./consultant-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantViewComponent implements OnDestroy {

private _destroy$ = new Subject();

  constructor(
    private consultantStore: ConsultantStore,
    private _route: ActivatedRoute) {
    let id: string;
    this._route.params.subscribe(param => {
      id = param.id;
    });
    this.consultantStore.initConsultant();
    console.log(this.consultantStore.consultant$);
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
