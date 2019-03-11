import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';

import { mockConsultant } from '@core/mocks/mock-consultant';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.scss']
})
export class ConsultantHeaderComponent implements OnInit {

  constructor() { }

  consultant$ = of(mockConsultant);

  ngOnInit() {
  }

}
