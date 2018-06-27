import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable'; // This is needed for the Return type for 'handleError'
import {catchError} from 'rxjs/operators';
import 'rxjs/add/observable/throw';


@Injectable()
export class WebService {

  public constructor( private httpClient: HttpClient) {}


  public static handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
        // A client-side or network error occurred.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return Observable.throw(errorMessage);
  }

  public getRequest(origin: string, resource: string, httpOptions?: Object) {
      if (httpOptions) {
          return this.httpClient.get(origin + resource, httpOptions).pipe(catchError(err => {
              return WebService.handleError(err);
          }));
      } else {
          return this.httpClient.get(origin + resource, {observe: 'response'}).pipe(catchError(err => {
              return WebService.handleError(err);
          }));
      }
  }

  public postRequest(origin: string, resource: string, data: {}, httpOptions?: object ): Observable<any> {
      if (httpOptions) {
          return this.httpClient.post(origin + resource, data, httpOptions).pipe(catchError(err => {
              return WebService.handleError(err);
          }));
      }else {
          return this.httpClient.post(origin + resource, data, {observe: 'response'}).pipe(catchError(err => {
              return WebService.handleError(err);
          }));
      }
  }

  public postUpload(origin: string, resource: string, data: any , httpOptions: object ): Observable<any> {
    return this.httpClient.post(origin + resource, data, httpOptions).pipe(catchError(err => {
        return WebService.handleError(err);
    }));
  }

  public putRequest(origin: string, resource: string, data: object, httpOptions: object): Observable<any> {
    return this.httpClient.put(origin + resource, data, httpOptions).pipe(catchError(err => {
        return WebService.handleError(err);
    }));
  }

  public patchRequest(origin: string, resource: string, data: object, httpOptions?: object): Observable<any> {
      if (httpOptions) {
          return this.httpClient.patch(origin + resource, data, httpOptions).pipe(catchError(err => {
              return WebService.handleError(err);
          }));
      }else {
          return this.httpClient.patch(origin + resource, data, {observe: 'response'}).pipe(catchError(err => {
              return WebService.handleError(err);
          }));
      }
  }

  public deleteRequest(origin: string, resource: string, httpOptions?: object): Observable<any> {
    if (httpOptions) {
        return this.httpClient.delete(origin + resource, httpOptions).pipe(catchError(err => {
            return WebService.handleError(err);
        }));
    }else {
        return this.httpClient.delete(origin + resource, {observe: 'response'}).pipe(catchError(err => {
            return WebService.handleError(err);
        }));
    }
  }
}
