import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { ConsultantService } from '../../core/services/consultant/consultant.service';
import { Consultant } from '../../core/models/consultant';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.scss']
})
export class ConsultantsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  consultants: Consultant[];
  constructor(private consultantsService: ConsultantService) { }

  ngOnInit() {
    this.subscription = this.consultantsService.getConsultants().subscribe( data => {
      this.consultants = data;
      console.log(this.consultants);
      this.consultants.forEach(con => {
        console.log(con.id);
      });
      console.log(this.consultants[0].id);
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
