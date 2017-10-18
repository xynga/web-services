import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, RequestMethod, ResponseContentType} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

type Json = {} | any;

@Injectable()
export class WebserviceService {
  private ReadHeaders: Headers;
  private WriteHeaders: Headers;

  private requestOptions: RequestOptionsArgs = {withCredentials: true};

  public static blobResponseHandler(response: Response): Blob {
    return response.blob() || new Blob();
  }

  public static arrayBufferResponseHandler(response: Response): ArrayBuffer {
    return response.arrayBuffer() || new ArrayBuffer(0);
  }

  public static httpResponseHandler(response: Response): string {
    return response.text() || '';
  }

  public static jsonResponseHandler(response: Response): Json {
    return response.json() || {};
  }

  public static errorResponseHandler(response: Response): ErrorObservable {
    if (!response) {
      console.error('Error: no webservice response');
    }
    else {
      console.error(response);
      // todo: add test in case no headers are returned due to Angular not understanding
      // the returned Content-Type (e.g. text/cvs --- instead of text/csv)

      let contentType = response.headers.get('content-type') || '';

      contentType = contentType.substring(0, (contentType + ';').indexOf(';'));

      let error: string;

      if ('text/html' === contentType) {
        error = response.text() || '';
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

  public constructor(private http: Http) {
    this.ReadHeaders = new Headers();
    this.ReadHeaders.append('Endpoint-Access', 'authorization/basic'); // fake header to force withCredentials:true basic authorization

    this.WriteHeaders = new Headers();
    this.WriteHeaders.append('Content-Type', 'application/json');
  }

  /**
   * Gets the default Headers for read (get) webservice access
   * @method readHeaders
   * @return {Headers} the read Headers for the application webservices
   */
  public get readHeaders(): Headers {
    return this.ReadHeaders;
  }

  /**
   * Gets the default Headers for write (post, put, patch, delete) webservice access
   * @method writeHeaders
   * @return {Headers} the write Headers for the application webservices
   */
  public get writeHeaders(): Headers {
    return this.WriteHeaders;
  }

  public getRequest(origin: string, resource: string, requestOptions?: RequestOptionsArgs): Observable<Response | any> {
    if (!requestOptions) {
      requestOptions = this.requestOptions;
    }

    requestOptions.method = RequestMethod.Get;

    if (ResponseContentType.Blob === requestOptions.responseType) {
      return this.http.get(origin + resource, requestOptions)
        .map(WebserviceService.blobResponseHandler)
        .catch(WebserviceService.errorResponseHandler);
    }
    else if (ResponseContentType.Json === requestOptions.responseType) {
      return this.http.get(origin + resource, requestOptions)
        .map(WebserviceService.jsonResponseHandler)
        .catch(WebserviceService.errorResponseHandler);
    }
    else {
      requestOptions.headers = this.readHeaders;

      if (ResponseContentType.ArrayBuffer === requestOptions.responseType) {
        return this.http.get(origin + resource, requestOptions)
          .map(WebserviceService.arrayBufferResponseHandler)
          .catch(WebserviceService.errorResponseHandler);
      }
      else if (ResponseContentType.Text === requestOptions.responseType) {
        return this.http.get(origin + resource, requestOptions)
          .map(WebserviceService.httpResponseHandler)
          .catch(WebserviceService.errorResponseHandler);
      }
      else {
        console.error('ERROR: requestOptionsArgs.responseType: \'' + requestOptions.responseType + '\'');
        console.error('Supported types are: ResponseContentType.Blob, ' +
          'ResponseContentType.Json, ResponseContentType.ArrayBuffer, or ResponseContentType.Text');
      }
    }
  }

  public exportGetRequest(origin: string, resource: string, header_type: string): Observable<Response | any> {
    const headers: Headers = new Headers;
    headers.append('Accept', header_type);

    this.requestOptions.headers = headers;
    this.requestOptions.method = RequestMethod.Get;
    this.requestOptions.responseType = ResponseContentType.Blob;

    return this.http.get(origin + resource, this.requestOptions)
      .map(WebserviceService.blobResponseHandler)
      .catch(WebserviceService.errorResponseHandler);
  }

  public postRequest(origin: string, resource: string, body: {}, headers: Headers = this.WriteHeaders): Observable<Response | any> {
    this.requestOptions.headers = headers;

    return this.http.post(origin + resource, JSON.stringify(body), this.requestOptions)
      .map(WebserviceService.jsonResponseHandler)
      .catch(WebserviceService.errorResponseHandler);
  }

  public putRequest(origin: string, resource: string, body: {}, headers: Headers = this.WriteHeaders): Observable<Response | any> {
    this.requestOptions.headers = headers;

    return this.http.put(origin + resource, JSON.stringify(body), this.requestOptions)
      .map(WebserviceService.jsonResponseHandler)
      .catch(WebserviceService.errorResponseHandler);
  }

  public patchRequest(origin: string, resource: string, body: {}, headers: Headers = this.WriteHeaders): Observable<Response | any> {
    this.requestOptions.headers = headers;

    return this.http.patch(origin + resource, JSON.stringify(body), this.requestOptions)
      .map(WebserviceService.jsonResponseHandler)
      .catch(WebserviceService.errorResponseHandler);
  }

  public deleteRequest(origin: string, resource: string, headers: Headers = this.WriteHeaders): Observable<Response | any> {
    this.requestOptions.headers = headers;

    return this.http.delete(origin + resource, this.requestOptions)
      .map(WebserviceService.jsonResponseHandler)
      .catch(WebserviceService.errorResponseHandler);
  }
}
