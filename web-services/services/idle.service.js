import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';
import { ApiService } from "./api.service";
var IdleService = /** @class */ (function () {
    function IdleService(idle, notificationsService, router, apiService) {
        var _this = this;
        this.idle = idle;
        this.notificationsService = notificationsService;
        this.router = router;
        this.apiService = apiService;
        this.idleTime = 20; // DEFAULT - 20 seconds
        this.idleWarningTime = 10; // DEFAULT - how long to show the warning before logging out.
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.idle.onIdleEnd.subscribe(function () { return _this.onIdleEnd(); });
        this.idle.onTimeout.subscribe(function () { return _this.onTimeout(); });
        this.idle.onIdleStart.subscribe(function () { return _this.onIdleStart(); });
        this.idle.onTimeoutWarning.subscribe(function (countdown) { return _this.onIdleWarning(countdown); });
    }
    IdleService.prototype.init = function (idleTime, idleWarningTime, redirectURL) {
        this.idleTime = idleTime;
        this.idleWarningTime = idleWarningTime;
        this.redirectURL = redirectURL;
        this.idle.setIdle(this.idleTime);
        this.idle.setTimeout(this.idleWarningTime);
        this.resetIdle();
    };
    IdleService.prototype.onTimeout = function () {
        console.log("Timed Out!");
        this.onLogout();
    };
    IdleService.prototype.onLogout = function () {
        this.idle.stop();
        this.router.navigate([this.redirectURL]);
        this.logoutConfirmation = this.notificationsService.info('Logout Notice', 'You were logged out due to inactivity', { timeOut: 0 });
    };
    IdleService.prototype.onIdleStart = function () {
        this.logoutWarning = this.notificationsService.warn('Logout Warning', '', { timeOut: this.idleWarningTime * 1000 });
    };
    IdleService.prototype.onIdleWarning = function (countdown) {
        if (this.logoutWarning) {
            this.logoutWarning.content = "You will be logged out of this application in " + countdown + " seconds due to inactivity";
        }
    };
    IdleService.prototype.onIdleEnd = function () {
        if (this.logoutWarning) {
            this.notificationsService.remove(this.logoutWarning.id);
        }
    };
    IdleService.prototype.resetIdle = function () {
        console.log("started");
        this.clearLogoutConfirmation();
        this.idle.watch();
    };
    IdleService.prototype.clearLogoutConfirmation = function () {
        if (this.logoutConfirmation) {
            this.notificationsService.remove(this.logoutConfirmation.id);
        }
    };
    IdleService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    IdleService.ctorParameters = function () { return [
        { type: Idle, },
        { type: NotificationsService, },
        { type: Router, },
        { type: ApiService, },
    ]; };
    return IdleService;
}());
export { IdleService };
//# sourceMappingURL=idle.service.js.map