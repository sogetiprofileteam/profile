import { Consultant } from '@core/models/index';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit {

  @Input() consultant: Consultant;

  constructor() { }

  ngOnInit() {
  }

}
