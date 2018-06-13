import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebService } from './web.service';
import { ApiService } from "./api.service";
import { IdleService } from "./idle.service";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { NgIdleModule } from "@ng-idle/core";
import { RouterModule } from "@angular/router";
import {NotificationsService} from "angular2-notifications";


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgIdleModule.forRoot(),
    RouterModule,
    HttpClientModule
  ],
  providers: [
    WebService,
    ApiService,
    IdleService,
    NotificationsService

  ],
  declarations: [],
  exports: []
})
export class ServiceModule {}
