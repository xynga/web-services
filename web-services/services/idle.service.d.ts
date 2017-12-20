import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { NotificationsService, Notification } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';
import { ApiService } from "./api.service";
export declare class IdleService {
    private idle;
    private notificationsService;
    private router;
    private apiService;
    logoutWarning: Notification;
    logoutConfirmation: Notification;
    origin: string;
    logoutPath: string;
    redirectURL: string;
    private idleTime;
    private idleWarningTime;
    constructor(idle: Idle, notificationsService: NotificationsService, router: Router, apiService: ApiService);
    init(idleTime: number, idleWarningTime: number, redirectURL: string): void;
    onTimeout(): void;
    onLogout(): void;
    onIdleStart(): void;
    onIdleWarning(countdown: number): void;
    onIdleEnd(): void;
    resetIdle(): void;
    clearLogoutConfirmation(): void;
}
