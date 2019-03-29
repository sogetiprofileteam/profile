import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsultantDataService } from '@feature/consultant/services/consultant-data/consultant-data.service';

@Component({
  selector: 'app-consultant-body',
  templateUrl: './consultant-body.component.html',
  styleUrls: ['./consultant-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantBodyComponent implements OnInit {

  constructor(public consultantService: ConsultantDataService) { }

  subscription: Subscription;
  consultant;
  ngOnInit() {
    this.subscription = this.consultantService.getConsultant(1).subscribe(data => {
      this.consultant = data;
      console.log(data);
    });
  }

}
