import {Injectable} from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import {Observable} from 'rxjs/Observable';

import {WebService} from './web.service';
import {CanonicalUser, Credentials, UpdateCanonicalUserRequest} from "../models/canonical-user.model";


@Injectable()
export class ApiService {
  public constructor(public webService: WebService) {}

  /**
   * Gets the user authentication state by logging in
   * @method getLogin
   * @param Credentials - interface containing the username and password of the user to log in
   * @return {Observable} an observable that returns the requested user or an error
   */
  public getLogin(credentials: Credentials, origin: string, path: string): Observable<{}> {
    let httpHeaders = new HttpHeaders({
        'Authorization':'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
    });

    const httpOptions = {
      headers: httpHeaders,
        observe: 'response'
    };

    return this.webService.getRequest(origin, path, httpOptions);
  }

  public putPassword( origin: string, path: string, userID: string, credentials: Credentials): Observable<{}> {
      const httpOptions = {
          password: credentials.password,
          observe: 'response'
      };

    return this.webService.patchRequest(origin, path + userID, {password: credentials.password}, httpOptions);
  }

  /**
   * Delete the user authentication state (logs out)
   * @method getLogout
   * @return {Observable} an observable that returns the requested report or an error
   */
  public putLogout(origin: string, path: string): Observable<{}> {
    return this.webService.deleteRequest(origin, path);
  }

  /**
   * Get the users with the specified user id
   * @method getUser
   * @return {Observable} an observable that returns the requested user or an error
   */
  public getUser(origin: string, path: string, userID: string): Observable<{}> {
    return this.webService.getRequest(origin, path + userID);
  }

  /**
   * Get the list of users that the authenticate administrator is allowed to see
   * @method getUsers
   * @return {Observable} an observable that returns the requested user list or an error
   */
  public getUsers(origin: string, path: string): Observable<{}> {
    return this.webService.getRequest(origin, path);
  }

  public updateUser(origin: string, path: string, user: UpdateCanonicalUserRequest): Observable <any> {
    return this.webService.patchRequest(origin, path + user.id, user);
  }

  public addUser(origin: string, path: string, user: CanonicalUser): Observable<any> {
    return this.webService.postRequest(origin, path, user);
  }
  /**
   * Get the list of users that the authenticate user is allowed to see
   * @method getUsersBasics
   * @return {Observable} an observable that returns the requested user list or an error
   */
  public getUsersBasics(origin: string, path: string): Observable<{}> {
    return this.webService.getRequest(origin, path);
  }

  public getFileSecure(credentials: Credentials, origin: string, path: string): Observable<{}> {
      let httpHeaders = new HttpHeaders({
          'Authorization':'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
      });

      const httpOptions = {
          headers: httpHeaders,
          responseType: 'blob'
      };

      return this.webService.getRequest(origin, path, httpOptions);
  }

  public getFile(origin: string, path: string): Observable<{}> {

      const httpOptions = {
          responseType: 'blob'
      };

      return this.webService.getRequest(origin, path, httpOptions);
  }

  public postFile(credentials: Credentials, origin: string, path: string, data: any): Observable<{}> {
    let httpHeaders = new HttpHeaders({
        'Authorization':'Basic ' + window.btoa(credentials.username + ':' + credentials.password),
        'Content-Type':'application/octet-stream'
    });
    const httpOptions = {
        headers: httpHeaders,
        observe: 'response'
    };

    return this.webService.postUpload(origin, path, data, httpOptions);
  }
}
