import { ServiceModule, WebService, ApiService, IdleService } from 'xynga-web-services';
import {TestBed, async, fakeAsync, tick, inject} from '@angular/core/testing';
import {
  Http, Response, RequestOptions, ResponseContentType, RequestOptionsArgs, XHRBackend,
  HttpModule, ResponseOptions, RequestMethod
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

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
      service.getRequest("","");
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
    service.getRequest("","", requestOptions);
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
      service.getRequest("","", requestOptions);
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
      service.getRequest("","", requestOptions);
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
      service.getRequest("","", requestOptions);
    }));
  it('blobResponseHandler should handle a response and return a blob', () => {
    spyOn(WebService, 'blobResponseHandler');

  });
});
