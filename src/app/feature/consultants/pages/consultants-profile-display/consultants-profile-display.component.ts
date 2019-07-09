import { Consultant } from '@core/models/index';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consultants-profile-display',
  templateUrl: './consultants-profile-display.component.html',
  styleUrls: ['./consultants-profile-display.component.scss']
})
export class ConsultantsProfileDisplayComponent implements OnInit {

  @Input() consultant: Consultant;

  constructor() { }

  ngOnInit() {
  }

}
