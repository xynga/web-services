import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';

import {NotificationsService, Notification} from 'angular2-notifications';

import 'rxjs/add/operator/toPromise';
import {ApiService} from './api.service';

@Injectable()
export class IdleService {

  public logoutWarning: Notification;
  public logoutConfirmation: Notification;
  public origin: string; // base path for API calls
  public logoutPath: string; // path for logging out user
  public redirectURL: string; // path for redirecting browser after timeout

  private idleTime = 20; // DEFAULT - 20 seconds
  private idleWarningTime = 10; // DEFAULT - how long to show the warning before logging out.

  public constructor(
    private idle: Idle,
    private notificationsService: NotificationsService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.onIdleEnd());
    this.idle.onTimeout.subscribe(() => this.onTimeout());
    this.idle.onIdleStart.subscribe(() => this.onIdleStart());
    this.idle.onTimeoutWarning.subscribe((countdown: any) => this.onIdleWarning(countdown));

  }

  init(idleTime: number, idleWarningTime: number, redirectURL: string) {
    this.idleTime = idleTime;
    this.idleWarningTime = idleWarningTime;
    this.redirectURL = redirectURL;

    this.idle.setIdle(this.idleTime);
    this.idle.setTimeout(this.idleWarningTime);

    this.resetIdle();
  }

  onTimeout() {
    this.onLogout();
  }

  onLogout() {
    this.idle.stop();
    this.router.navigate([this.redirectURL]);
    this.logoutConfirmation = this.notificationsService.info(
      'Logout Notice',
      'You were logged out due to inactivity',
      {timeOut: 0}
    );
  }

  onIdleStart() {
    this.logoutWarning = this.notificationsService.warn(
      'Logout Warning',
      '',
      {timeOut: this.idleWarningTime * 1000}
    );
  }

  onIdleWarning(countdown: number) {
    if (this.logoutWarning) {
      this.logoutWarning.content = `You will be logged out of this application in ${countdown} seconds due to inactivity`;
    }
  }

  onIdleEnd() {
    if (this.logoutWarning) {
      this.notificationsService.remove(this.logoutWarning.id);
    }
  }

  resetIdle() {
    this.clearLogoutConfirmation();
    this.idle.watch();
  }

  clearLogoutConfirmation() {
    if (this.logoutConfirmation) {
      this.notificationsService.remove(this.logoutConfirmation.id);
    }
  }
}
