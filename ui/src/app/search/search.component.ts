import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';
import { Search } from '../models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: Search = new Search();

  constructor(public searchService: SearchService) { }

  ngOnInit() {
  }

  onSubmit() {
    let practice = this.search.practice;
    let skill = this.search.skill;
    let ato = this.search.ato;
    let query;

    // if (this.search.skills) {
    //   console.log(this.search.skills);
    //   skills = this.skillsString(this.search.skills);
    // } else {
    //   skills = ''
    // }

    query = '?practice=' + practice + '&skill=' + skill + '&ato=' + ato;

    this.searchService.getSearchResponse(query);
  }

  // skillsString(skills) {
  //   let skillsString;

  //   skills.array.forEach(element => {
  //     let string;

  //     string = '&skill=' + element;

  //     skillsString.push(String);
  //   });

  //   return skillsString;
  // }

}
