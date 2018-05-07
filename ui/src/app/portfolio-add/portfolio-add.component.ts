import { Component, OnInit } from '@angular/core';

import { Profile } from '../models/profile';
import { PortfolioAddService } from './portfolio-add.service';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html',
  styleUrls: ['./portfolio-add.component.scss']
})
export class PortfolioAddComponent implements OnInit {

  profile: Profile = new Profile();

  constructor(private service: PortfolioAddService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.profile);
    this.service.postProfile(this.profile).subscribe(res => {
      console.log('successful');
    }, error => {
      console.log('error');
    });

  }

}
