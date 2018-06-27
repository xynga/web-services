import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpErrorResponse} from '@angular/common/http';
import {WebService} from './web.service';
import {ServiceModule} from './service.module';

describe('WebService', () => {
  let injector: TestBed;
  let service: WebService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceModule, HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(WebService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Web Service should be visible through ServiceModule', () => {
    expect(service).toBeTruthy();
  });
  it('Test Get Request with no httpOptions', () => {
    const dummyUser = [
      {username: 'user'}
    ];
    service.getRequest('test.com', '/canonical-users/id/user').subscribe(data => {
      expect(data.body).toEqual(dummyUser);
    });
    const req = httpMock.expectOne('test.com/canonical-users/id/user');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });
  it('Test Get Request with httpOptions', () => {
    const dummyUser = [
      {username: 'user'}
    ];
    service.getRequest('test.com', '/canonical-users/id/user', {observe: 'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyUser);
    });
    const req = httpMock.expectOne('test.com/canonical-users/id/user');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });
  it('Test Post Request with no httpOptions', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {'dummy': 'data'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
  it('Test Post Request with httpOptions', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {'dummy': 'data'}, {observe: 'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
  it('Test Post Upload', () => {
    const dummyResponse = [
      {}
    ];
    service.postUpload('test.com', '/', {'dummy': 'data'}, {observe: 'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
  it('Test Put Request', () => {
    const dummyResponse = [
      {}
    ];
    service.putRequest('test.com', '/', {'dummy': 'data'}, {observe: 'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });
  it('Test Patch Request', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {'dummy': 'data'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyResponse);
  });
  it('Test Patch Request with httpOptions', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {'dummy': 'data'}, {observe: 'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyResponse);
  });
  it('Test Delete Request', () => {
    const dummyResponse = [
      {}
    ];
    service.deleteRequest('test.com', '/').subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
  it('Test Delete Request', () => {
    const dummyResponse = [
      {}
    ];
    service.deleteRequest('test.com', '/', {observe: 'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
  it('Test Get Request with no httpOptions ERROR', () => {
    const dummyUser = [
      {username: 'user'}
    ];
    service.getRequest('test.com', '/canonical-users/id/user').subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/user');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Get Request with httpOptions ERROR', () => {
    const dummyUser = [
      {username: 'user'}
    ];
    service.getRequest('test.com', '/canonical-users/id/user', {}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/user');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Post Request with no httpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {'dummy': 'data'}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Post Request with httpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {'dummy': 'data'}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Post Upload ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.postUpload('test.com', '/', {'dummy': 'data'}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Put Request ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.putRequest('test.com', '/', {'dummy': 'data'}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Patch Request ERROR ', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {'dummy': 'data'}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('PATCH');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Patch Request with httpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {'dummy': 'data'}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('PATCH');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Delete Request ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.deleteRequest('test.com', '/').subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
  it('Test Delete Request with HttpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.deleteRequest('test.com', '/', {}).subscribe(data => {
      fail('Should not reach here');
    }, (err: HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('There Was an Error', {}), {status: 400});
  });
});
