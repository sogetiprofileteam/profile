import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Profile } from '../models/profile';
import { Search } from '../models/search';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getSearchResponse(search: Search): Observable<Profile[]> {
    const url = environment.api.url + environment.api.resources.search;
    const location = this.appendQueryParams(search, url);
    return this.http.get<Profile[]>(location);
  }

  private appendQueryParams(search: Search, url: string): string {
    url += '?';
    if (search.ato) {
      url += `ato=${search.ato}&`;
    }
    if (search.practice) {
      url += `practice=${search.practice}&`;
    }
    if (search.skills && search.skills.length) {
      for (const skill of search.skills) {
        url += `skill=${skill}&`;
      }
    }
    return encodeURI(url);
  }
}
