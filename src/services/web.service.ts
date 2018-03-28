import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';


@Injectable()
export class WebService {

  public constructor( private httpClient: HttpClient) {
  }

  public getRequest(origin: string, resource: string, httpOptions?: Object) {
      if (httpOptions) {
          return this.httpClient.get(origin + resource, httpOptions);
      } else {
          return this.httpClient.get(origin + resource);
      }
  }

  public postRequest(origin: string, resource: string, data: {}, httpOptions?: object ): Observable<any> {
      if (httpOptions) {
          return this.httpClient.post(origin + resource, data, httpOptions);
      }else {
          return this.httpClient.post(origin + resource, data);
      }
  }

  public postUpload(origin: string, resource: string, data: any , httpOptions: object ): Observable<any> {
    return this.httpClient.post(origin + resource, data, httpOptions);
  }

  public putRequest(origin: string, resource: string, data: object, httpOptions: object): Observable<any> {
    return this.httpClient.put(origin + resource, data, httpOptions);
  }

  public patchRequest(origin: string, resource: string, data: object, httpOptions?: object): Observable<any> {
      if (httpOptions) {
          return this.httpClient.patch(origin + resource, data, httpOptions);
      }else {
          return this.httpClient.patch(origin + resource, data);
      }
  }

  public deleteRequest(origin: string, resource: string, httpOptions?: object): Observable<any> {
    if(httpOptions) {
        return this.httpClient.delete(origin + resource, httpOptions);
    }else{
        return this.httpClient.delete(origin + resource);
    }
  }
}
