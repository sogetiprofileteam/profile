import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class PracticeService {
  private readonly practices = [
    'Digital Transformation',
    'Application & Cloud Technologies',
    'Test',
    'Digital Insights & Analytics'
  ];
  public get(): Observable<string[]> {
    return Observable.of(this.practices);
  }
}
