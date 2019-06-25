import { ConsultantSearch } from '@core/models/consultantSearch';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultant } from '@core/models/consultant';
import { ConsultantsStoreService } from '../../services/consultants-store/consultants-store.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-consultants-view',
  templateUrl: './consultants-view.component.html',
  styleUrls: ['./consultants-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantsViewComponent implements OnInit {

  constructor(private consultantsService: ConsultantsStoreService) {
    this.consultantsService.initConsultants();
  }
  filter = { mens: true, womens: true, kids: true };
  consultants$: Observable<ConsultantSearch[]>;
  filteredConsultants$: Observable<ConsultantSearch[]>;

  ngOnInit() {
    this.consultants$ = this.consultantsService.consultants$;
    this.filteredConsultants$ = this.consultants$;
  }

  filterChange() {
  //   this.filteredConsultants$ = this.filteredConsultants$.filter(x =>
  //     (x.practice === 'Applications & Cloud Technology' && this.filter.kids)
  //     || (x.practice === 'Digital Transformation' && this.filter.mens)
  //     || (x.practice === 'Cloud' && this.filter.womens)
  //  );

    this.filteredConsultants$ = this.consultants$.pipe(
      map((consultants: ConsultantSearch[]) => consultants.filter(c => c.practice.includes('ACT')) )
    );
    console.log('box clicked');
  }

}
