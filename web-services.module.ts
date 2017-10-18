import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebserviceService } from './services/webservice.service';
import { ApiService } from "./services/api.service";
import { HttpModule } from '@angular/http';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule

  ],
  providers: [
    WebserviceService,
    ApiService
  ],
  declarations: [],
  exports: [WebserviceService, ApiService]
})
export class WebServicesModule {}
