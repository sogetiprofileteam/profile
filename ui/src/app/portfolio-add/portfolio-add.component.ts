import { Component, OnInit } from '@angular/core';

import { Profile } from '../models/profile';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html',
  styleUrls: ['./portfolio-add.component.scss']
})
export class PortfolioAddComponent implements OnInit {

  profile: Profile = new Profile();

  constructor() { }

  ngOnInit() {
    
  }

  onSubmit() {
    console.log(this.profile);
  }

}
