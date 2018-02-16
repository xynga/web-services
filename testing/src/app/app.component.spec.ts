import { ServiceModule, WebService, ApiService, IdleService } from 'xynga-web-services';
import {TestBed, async, fakeAsync, tick, inject} from '@angular/core/testing';
import {
  Http, Response, RequestOptions, ResponseContentType, RequestOptionsArgs, XHRBackend,
  HttpModule, ResponseOptions, RequestMethod, Headers
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Observable} from "rxjs/Observable";

describe('Web Service', () => {

  let service: WebService;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        WebService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
    service = new WebService(http);
  });

  it('getRequest() should be called', () => {
    spyOn(service, 'getRequest');
    service.getRequest("test", "test");
    expect(service.getRequest).toHaveBeenCalled();
  });
  it('should make a get request with RequestMethod set to Get and withCredentials set to True as default',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {

      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.withCredentials).toBeTruthy();

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });
      service.getRequest('','');
    }));
  it('getRequest should pass Blob ContentType to the HTTP request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
    mockBackEnd.connections.subscribe(connection => {
      expect(connection.request.responseType).toBe(ResponseContentType.Blob);

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify('OK'),
        status: 200
      })));
    });
    let requestOptions: RequestOptionsArgs = {responseType: ResponseContentType.Blob};
    service.getRequest('','', requestOptions);
  }));
  it('getRequest should pass Json ContentType to the HTTP request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.responseType).toBe(ResponseContentType.Json);

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });

      let requestOptions: RequestOptionsArgs = {responseType: ResponseContentType.Json};
      service.getRequest('','', requestOptions);
    }));
  it('getRequest should pass ArrayBuffer ContentType to the HTTP request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.responseType).toBe(ResponseContentType.ArrayBuffer);

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });

      let requestOptions: RequestOptionsArgs = {responseType: ResponseContentType.ArrayBuffer};
      service.getRequest('','', requestOptions);
    }));
  it('getRequest should pass Text ContentType to the HTTP request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.responseType).toBe(ResponseContentType.Text);

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });

      let requestOptions: RequestOptionsArgs = {responseType: ResponseContentType.Text};
      service.getRequest('','', requestOptions);
    }));
  it('exportGetRequest should pass content type Blob',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.responseType).toBe(ResponseContentType.Blob);

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });
      service.exportGetRequest('', '', '');
    }));
/*  it('errorResponseHandler should return an observable',
    () => {
      spyOn(console, 'error');
      let response: Response = new Response(new ResponseOptions ({
        status: 200
      }));
      let headers = new Headers();
      headers.append('content-type', 'test');
      WebService.errorResponseHandler(response);
      expect(console.error).toHaveBeenCalledWith(`${response.status} ${''} ${''}`)
    });*/

  it('postRequest should pass a specific header to the http request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.headers.get('content')).toBe('none');

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });

      let headers = new Headers();
      headers.append('content', 'none');
      service.postRequest('', '', '', headers);
    }));
  it('postUpload should set application/octet-stream in the headers',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.headers.get('Content-Type')).toBe('application/octet-stream');

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });
      let blob: Blob;
      let headers = new Headers();
      headers.append('Content-Type', 'application/octet-stream');
      service.postUpload('', '', blob, headers);
    }));
  it('putRequest should pass a specific content-type header to the http request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.headers.get('Content-Type')).toBe('application/json');

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });
      service.putRequest('', '', '');
    }));
  it('patchRequest should pass a specific content-type header to the http request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.headers.get('Content-Type')).toBe('application/json');

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });
      service.patchRequest('', '', '');
    }));
  it('deleteRequest should pass a specific content-type header to the http request',
    inject([WebService, XHRBackend], (service: WebService, mockBackEnd: MockBackend) => {
      mockBackEnd.connections.subscribe(connection => {
        expect(connection.request.headers.get('Content-Type')).toBe('application/json');

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify('OK'),
          status: 200
        })));
      });
      let headers = new Headers();
      headers.append("Content-Type", 'application/json');
      service.deleteRequest('', '', headers);
    }));
});

describe ('Api Service', () => {
  let service: ApiService;
  let webService: WebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ApiService,
        WebService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
    service = new ApiService(webService);

    it('securedJsonRequestOptions should be set', () => {
      spyOn(service, 'getRequest');
      service.getRequest("test", "test");
      expect(service.getRequest).toHaveBeenCalled();
    });


});
