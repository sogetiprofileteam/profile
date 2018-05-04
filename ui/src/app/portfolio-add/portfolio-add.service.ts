import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Profile } from '../models/profile';

const postEndpoint = 'https://localhost:3000/profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PortfolioAddService {

  constructor(private http: HttpClient) { }

  postProfile(profile: Profile) {
    return this.http.post(postEndpoint, profile);
}


}
