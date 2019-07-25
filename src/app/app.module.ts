import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { HttpClientModule } from '@angular/common/http';

import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';

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
    MsAdalAngular6Module.forRoot({
      tenant: '6085de46-5c5f-404e-bdc2-2a7227ddce84',
      clientId: '1c9c9d13-b1ad-47dc-8fbd-7571f067b368',
      redirectUri: 'https://localhost:4200/',
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localstorage',
    }),
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '850px', hasBackdrop: true } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    [AuthenticationGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
