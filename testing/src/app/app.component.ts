import { Component } from '@angular/core';
import {ApiService} from "xynga-web-services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService){}

}
