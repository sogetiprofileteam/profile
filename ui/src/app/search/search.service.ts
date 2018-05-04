import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Profile } from '../models/profile';
import { Search } from '../models/search';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getSearchResponse(query: Search) {
    return this.http.get('https://localhost:3000/search?practice=' + query.practice + '&skill=' + query.skills + '&ato=' + query.ato);
}


}
