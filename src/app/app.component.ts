import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoadingScreen = true;
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart){
        this.showLoadingScreen = true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showLoadingScreen = false;
      }
    })
   }

}
