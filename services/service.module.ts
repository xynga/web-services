import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebService } from './webservice.service';
import { ApiService } from "./api.service";
import { IdleService } from "./idle.service";
import { HttpModule } from '@angular/http';
import { NgIdleModule } from "@ng-idle/core";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgIdleModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    RouterModule
  ],
  providers: [
    WebService,
    ApiService,
    IdleService
  ],
  declarations: [],
  exports: []
})
export class ServiceModule {}
