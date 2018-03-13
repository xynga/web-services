import {WebService, IdleService, ApiService} from 'xynga-web-services';
import {TestBed, inject} from '@angular/core/testing';
import {
  Http, Response, ResponseContentType, RequestOptionsArgs, XHRBackend,
  HttpModule, ResponseOptions, RequestMethod, Headers, ConnectionBackend, RequestOptions
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Idle, NgIdleModule} from "@ng-idle/core";
import {NotificationsService, SimpleNotificationsModule} from "angular2-notifications/dist";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

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
describe('Idle Service', () => {
  let idle: IdleService;
  beforeEach(() => {
    let mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [NgIdleModule.forRoot(), SimpleNotificationsModule.forRoot(),
        RouterTestingModule.withRoutes([]), HttpModule],
      providers: [IdleService, Idle, ApiService, WebService, ConnectionBackend, {provide: Router, useValue: mockRouter}]
    });
  });
/*  it("Idle instance should be defined",
    inject([IdleService], (injectIdleService) => {
    injectIdleService.init(5, 5, '');
    expect(injectIdleService).toBeDefined();
  }));*/
  it("Idle instance should be defined",
    inject([Idle, NotificationsService, ApiService],
      (idle, notificationService, apiService) => {
      idle = new IdleService(idle, notificationService, TestBed.get(Router), apiService);
      idle.init(3,3,'');
      expect(idle).toBeDefined();
  }));
});

