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
    console.log(query);
    return this.http.get('http://localhost:3000/search' + query);
  }


}
