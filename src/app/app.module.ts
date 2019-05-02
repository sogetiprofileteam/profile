import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { HttpClientModule } from '@angular/common/http';

import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ConsultantsComponent } from './feature/consultants/consultants.component';
import { Services } from 'services/index';

@NgModule({
  declarations: [
    AppComponent,
    ConsultantsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    Services,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '850px', hasBackdrop: true }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
