import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Profile } from '../../models/profile';

const postEndpoint = 'http://localhost:3000/profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProfileAddService {

  constructor(private http: HttpClient) { }

  postProfile(profile: Profile): Observable<string> {
    return this.http.post<string>(postEndpoint, profile);
}


}
