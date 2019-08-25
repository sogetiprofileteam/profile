import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {BroadcastService, MsalService} from '@azure/msal-angular';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  public userInfo: any = null;
  private subscription: Subscription;
  public isIframe: boolean;

    constructor(private broadcastService: BroadcastService,
                private authService: MsalService) {
      // This is to avoid reload during acquireTokenSilent() becuase of hidden iframe
      this.isIframe = window !== window.parent && !window.opener;
      if (this.authService.getUser()) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }

    login() {
      this.authService.loginPopup(['api.read', 'api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user']);
    }

    logout() {
      this.authService.logout();
    }

    ngOnInit() {
      this.broadcastService.subscribe('msal:loginFailure', (payload) => {
        console.log('login failure ' + JSON.stringify(payload));
        this.loggedIn = false;
      });

      this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
        console.log('login success ' + JSON.stringify(payload));
        this.loggedIn = true;
      });
    }

    ngOnDestroy() {
      this.broadcastService.getMSALSubject().next(1);
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }


}
