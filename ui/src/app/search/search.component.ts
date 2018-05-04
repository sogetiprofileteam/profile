import { Component, OnInit } from '@angular/core';

import { Profile } from '../models/profile';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  profile: Profile = new Profile();

  constructor() { }

  ngOnInit() {
  }

}
