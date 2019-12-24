import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { LogLevel } from 'msal';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log('Client logging ' + message);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    MsalModule.forRoot({
      clientID: '5972006a-33d3-4ef5-b37e-e08cf85e8cd8',
      authority: 'https://login.microsoftonline.com/6085de46-5c5f-404e-bdc2-2a7227ddce84',
      validateAuthority: true,
      redirectUri: 'https://localhost:4200',
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: 'https://localhost:4200',
      navigateToLoginRequestUrl: true,
      popUp: false,
      consentScopes: ['user.read'],
      logger: loggerCallback,
      level: LogLevel.Info,
      piiLoggingEnabled: false,
      protectedResourceMap: [ ['https://localhost:5000/', ['api.read', 'api.write', 'api.delete']] ]
    }
    ),
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '850px', hasBackdrop: true } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
