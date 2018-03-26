import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebService } from './web.service';
import { ApiService } from "./api.service";
import { IdleService } from "./idle.service";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { NgIdleModule } from "@ng-idle/core";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgIdleModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    RouterModule,
    HttpClientModule
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
