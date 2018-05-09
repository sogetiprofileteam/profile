import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';
import { Search } from '../models/search';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public search: Search = new Search();
  public results: Profile[] = [];
  public searchSkills = '';
  constructor(public searchService: SearchService) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      this.search.skills = this.searchSkills.split(/[\s,;]+/);
      this.results = await this.searchService
        .getSearchResponse(this.search)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }
}
