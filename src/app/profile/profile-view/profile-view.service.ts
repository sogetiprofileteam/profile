import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profile } from '../../models/profile';

@Injectable()
export class ProfileViewService {

  constructor(private http: HttpClient) {}

  public async get(id: string): Promise<Profile> {
    const result = await this.http.get<Profile>(
      environment.api.url + environment.api.resources.profile + '/' + id,
      environment.api.httpOptions).toPromise();
    return result;
  }
}
