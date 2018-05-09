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

  protected search: Search = new Search();
  protected results: Profile[] = [];
  constructor(public searchService: SearchService) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      this.results = await this.searchService
        .getSearchResponse(this.search)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }
}
