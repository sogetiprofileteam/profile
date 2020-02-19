import { Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {BroadcastService, MsalService} from '@azure/msal-angular';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    login() {
    }

    logout() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
  }
