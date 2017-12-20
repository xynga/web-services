import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebService } from './web.service';
import { ApiService } from "./api.service";
import { IdleService } from "./idle.service";
import { HttpModule } from '@angular/http';
import { NgIdleModule } from "@ng-idle/core";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterModule } from "@angular/router";
var ServiceModule = /** @class */ (function () {
    function ServiceModule() {
    }
    ServiceModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    ServiceModule.ctorParameters = function () { return []; };
    return ServiceModule;
}());
export { ServiceModule };
//# sourceMappingURL=service.module.js.map