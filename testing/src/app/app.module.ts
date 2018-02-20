import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ServiceModule } from 'xynga-web-services';
import { OauthService } from "xynga-web-services";

const routes: Routes = [{ path: 'testing', component: AppComponent }];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [OauthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
