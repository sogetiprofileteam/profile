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

  practiceFilter = new Array();
  statusFilter = new Array();
  filter = { statusFilter: Array, practiceFilter: Array};
  consultants$: Observable<ConsultantSearch[]>;
  filteredConsultants$: Observable<ConsultantSearch[]>;

  ngOnInit() {
    this.consultants$ = this.consultantsService.consultants$;
    this.filteredConsultants$ = this.consultants$;
  }

  filterChange(status: string, practice: string, coreskill: string, techskills: string,
               grade: string, certifications: string, roles: string) {
  //   this.filteredConsultants$ = this.filteredConsultants$.filter(x =>
  //     (x.practice === 'Applications & Cloud Technology' && this.filter.kids)
  //     || (x.practice === 'Digital Transformation' && this.filter.mens)
  //     || (x.practice === 'Cloud' && this.filter.womens)
  //  );
    this.filteredConsultants$ = this.consultants$;
    if (status !== '' && this.filter.statusFilter.length > 1) {
      console.log('status btn clicked: ' + status + ' filter status:' + this.filter.statusFilter.length);
      this.filteredConsultants$ = this.consultants$.pipe(
        map((consultants: ConsultantSearch[]) => consultants.filter(c => c.status.name.startsWith(status)) )
      );
    }
    if (practice !== '' || this.filter.practiceFilter.length > 1) {
      console.log('practice btn clicked: ' + practice + ' filter practice:' + this.filter.practiceFilter.length);
      if (this.practiceFilter.includes(practice)) {
        this.practiceFilter.sort();
        const index = this.practiceFilter.indexOf(practice);
        this.practiceFilter.splice(index, 1);
      } else {
        this.practiceFilter.push(practice);
      }
      console.log('practiceFilterlength: ' + this.practiceFilter.length);
      /* Use this later when doing multiple filters.... maybe
      this.practiceFilter.forEach((filter: string) => {
        this.filteredConsultants$ = this.consultants$.pipe(
          map((consultants: ConsultantSearch[]) => consultants.filter(c => c.practice.includes(filter)) )
        );
        console.log(filter);
      }); */
      this.filteredConsultants$ = this.consultants$.pipe(
        map((consultants: ConsultantSearch[]) => consultants.filter(c => c.practice.includes(practice)) )
      );
      // this.filteredConsultants$ = this.consultants$.pipe(
      //   map((consultants: ConsultantSearch[]) => consultants.filter(c => c.practice.includes(practice)) )
      // );
    } else {
      this.filteredConsultants$ = this.consultants$;
    }
  }
}
