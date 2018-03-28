import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";


@Injectable()
export class WebService {

  public constructor( private httpClient: HttpClient) {
  }
    public static errorResponseHandler(response: Response): ErrorObservable {
        if (!response) {
            console.error('Error: no webservice response');
        }
        else {
            console.error(response);
            // todo: add test in case no headers are returned due to Angular not understanding
            // the returned Content-Type (e.g. text/cvs --- instead of text/csv)

            let contentType = response.headers!.get('content-type') || ''; // the ! - Non-null assertion operator is needed to coerce away typescript compiler error

            contentType = contentType.substring(0, (contentType + ';').indexOf(';'));

            let error: string;

            if ('text/html' === contentType) {
                error = response.toString()|| '';
            }
            else if ('application/json' === contentType) {
                error = JSON.stringify(response.json());
            }
            else {
                // handle when the Content-Type is missing or not recognized
                // for instance: Angular not understanding the returned Content-Type (e.g. text/cvs instead of text/csv)
                error = 'Unrecognized error response Content-Type: \"' + contentType + '\"';
            }

            console.error(`${response.status} ${response.statusText || ''} ${error || ''}`);
            console.dir(response);
        }

        return Observable.throw(response);
    }

  public getRequest(origin: string, resource: string, httpOptions?: Object) {
      if (httpOptions) {
          return this.httpClient.get(origin + resource, httpOptions).pipe(catchError(err => {
              return WebService.errorResponseHandler(err);
          }));
      } else {
          return this.httpClient.get(origin + resource).pipe(catchError(err => {
              return WebService.errorResponseHandler(err);
          }));
      }
  }

  public postRequest(origin: string, resource: string, data: {}, httpOptions?: object ): Observable<any> {
      if (httpOptions) {
          return this.httpClient.post(origin + resource, data, httpOptions).pipe(catchError(err => {
              return WebService.errorResponseHandler(err);
          }));
      }else {
          return this.httpClient.post(origin + resource, data).pipe(catchError(err => {
              return WebService.errorResponseHandler(err);
          }));
      }
  }

  public postUpload(origin: string, resource: string, data: any , httpOptions: object ): Observable<any> {
    return this.httpClient.post(origin + resource, data, httpOptions).pipe(catchError(err => {
        return WebService.errorResponseHandler(err);
    }));
  }

  public putRequest(origin: string, resource: string, data: object, httpOptions: object): Observable<any> {
    return this.httpClient.put(origin + resource, data, httpOptions).pipe(catchError(err => {
        return WebService.errorResponseHandler(err);
    }));
  }

  public patchRequest(origin: string, resource: string, data: object, httpOptions?: object): Observable<any> {
      if (httpOptions) {
          return this.httpClient.patch(origin + resource, data, httpOptions).pipe(catchError(err => {
              return WebService.errorResponseHandler(err);
          }));
      }else {
          return this.httpClient.patch(origin + resource, data).pipe(catchError(err => {
              return WebService.errorResponseHandler(err);
          }));
      }
  }

  public deleteRequest(origin: string, resource: string, httpOptions?: object): Observable<any> {
    if(httpOptions) {
        return this.httpClient.delete(origin + resource, httpOptions).pipe(catchError(err => {
            return WebService.errorResponseHandler(err);
        }));
    }else{
        return this.httpClient.delete(origin + resource).pipe(catchError(err => {
            return WebService.errorResponseHandler(err);
        }));
    }
  }
}
