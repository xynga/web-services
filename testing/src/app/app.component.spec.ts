
import { ServiceModule, WebService, ApiService, IdleService } from 'xynga-web-services';
import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UpdateCanonicalUserRequest} from "xynga-web-services";
import {CanonicalUser} from "xynga-web-services";
import { RouterTestingModule } from "@angular/router/testing";
import {Component} from "@angular/core";
import {Notification} from "angular2-notifications";
import {HttpErrorResponse} from "@angular/common/http";



@Component({
  template: ''
})
class DummyComponent {
}

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
    expect(req.request.method).toBe("GET");
    req.flush(dummyUser);
  });
  it('Test Get Request with httpOptions', () => {
    const dummyUser = [
      {username: 'user'}
    ];
    service.getRequest('test.com', '/canonical-users/id/user', {observe:'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyUser);
    });
    const req = httpMock.expectOne('test.com/canonical-users/id/user');
    expect(req.request.method).toBe("GET");
    req.flush(dummyUser);
  });
  it('Test Post Request with no httpOptions', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {"dummy": "data"}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe("POST");
    req.flush(dummyResponse);
  });
  it('Test Post Request with httpOptions', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {"dummy": "data"}, {observe:'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe("POST");
    req.flush(dummyResponse);
  });
  it('Test Post Upload', () => {
    const dummyResponse = [
      {}
    ];
    service.postUpload('test.com', '/', {"dummy": "data"}, {observe:'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("POST");
    req.flush(dummyResponse);
  });
  it('Test Put Request', () => {
    const dummyResponse = [
      {}
    ];
    service.putRequest('test.com', '/', {"dummy": "data"}, {observe:'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("PUT");
    req.flush(dummyResponse);
  });
  it('Test Patch Request', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {"dummy": "data"}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("PATCH");
    req.flush(dummyResponse);
  });
  it('Test Patch Request with httpOptions', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {"dummy": "data"}, {observe:'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("PATCH");
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
    expect(req.request.method).toBe("DELETE");
    req.flush(dummyResponse);
  });
  it('Test Delete Request', () => {
    const dummyResponse = [
      {}
    ];
    service.deleteRequest('test.com', '/', {observe:'response'}).subscribe(data => {
      expect(data.body).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("DELETE");
    req.flush(dummyResponse);
  });
  it('Test Get Request with no httpOptions ERROR', () => {
    const dummyUser = [
      {username: 'user'}
    ];
    service.getRequest('test.com', '/canonical-users/id/user').subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/user');
    expect(req.request.method).toBe("GET");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Get Request with httpOptions ERROR', () => {
    const dummyUser = [
      {username: 'user'}
    ];
    service.getRequest('test.com', '/canonical-users/id/user', {}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/user');
    expect(req.request.method).toBe("GET");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Post Request with no httpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {"dummy": "data"}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe("POST");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Post Request with httpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.postRequest('test.com', '/canonical-users/id/', {"dummy": "data"}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/canonical-users/id/');
    expect(req.request.method).toBe("POST");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Post Upload ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.postUpload('test.com', '/', {"dummy": "data"}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("POST");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Put Request ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.putRequest('test.com', '/', {"dummy": "data"}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("PUT");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Patch Request ERROR ', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {"dummy": "data"}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("PATCH");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Patch Request with httpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.patchRequest('test.com', '/', {"dummy": "data"}, {}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("PATCH");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Delete Request ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.deleteRequest('test.com', '/').subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("DELETE");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
  it('Test Delete Request with HttpOptions ERROR', () => {
    const dummyResponse = [
      {}
    ];
    service.deleteRequest('test.com', '/', {}).subscribe(data => {
      fail('Should not reach here');
    }, (err : HttpErrorResponse) => expect(err.toString()).toContain('400'));
    const req = httpMock.expectOne('test.com/');
    expect(req.request.method).toBe("DELETE");
    req.error(new ErrorEvent("There Was an Error", {}), {status:400});
  });
});
describe('ApiService', () => {
  let api: ApiService;

  beforeEach( () =>{
    TestBed.configureTestingModule({
      imports: [ServiceModule]
    });
    api = TestBed.get(ApiService);
  });

  it('Tests if the ApiService was created', () => {
    expect(api).toBeTruthy();
  });
  it('Tests if the ApiService.getLogin calls webService.getRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "getRequest").and.stub();
    const cred = {
      username:'user',
      password:'password'
    };
    api.getLogin(cred, 'test.com', '/login');
    expect(mySpy).toHaveBeenCalledWith('test.com', '/login', jasmine.any(Object));
  });
  it('Tests if the ApiService.putPassword calls webService.patchRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "patchRequest").and.stub();
    const cred = {
      username:'user',
      password:'password'
    };

    api.putPassword('test.com', '/pass/','user', cred);
    expect(mySpy).toHaveBeenCalledWith('test.com','/pass/user', { password: cred.password}, jasmine.any(Object));
  });
  it('Tests if the ApiService.putLogout calls webService.deleteRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "deleteRequest").and.stub();
    const cred = {
      username:'user',
      password:'password'
    };

    api.putLogout('test.com', '/logout');
    expect(mySpy).toHaveBeenCalledWith('test.com','/logout');
  });
  it('Tests if the ApiService.getUser calls webService.getRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "getRequest").and.stub();
    const cred = {
      username:'user',
      password:'password'
    };

    api.getUser('test.com', '/users/', 'user');
    expect(mySpy).toHaveBeenCalledWith('test.com','/users/user');
  });
  it('Tests if the ApiService.getUsers calls webService.getRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "getRequest").and.stub();
    api.getUsers('test.com', '/users');
    expect(mySpy).toHaveBeenCalledWith('test.com','/users');
  });
  it('Tests if the ApiService.updateUser calls webService.patchRequest', () => {
    const mySpy = spyOn(api.webService, "patchRequest").and.stub();

    api.updateUser('test.com', '/users/', new UpdateCanonicalUserRequest(new CanonicalUser({id: '1', first: 'test',middle: 'test', last: 'McTesterSon', initials:'TT', phone: '123'})));
    expect(mySpy).toHaveBeenCalled();
  });
  it('Tests if the ApiService.addUser calls webService.postRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "postRequest").and.stub();

    api.addUser('test.com', '/user', new CanonicalUser());
    expect(mySpy).toHaveBeenCalledWith('test.com','/user', jasmine.any(Object));
  });
  it('Tests if the ApiService.getUsersBasics calls webService.getRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "getRequest").and.stub();
    api.getUsersBasics('test.com', '/users');
    expect(mySpy).toHaveBeenCalledWith('test.com','/users');
  });
  it('Tests if the ApiService.getFileSecure calls webService.getRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "getRequest").and.stub();
    const cred = {
      username:'user',
      password:'password'
    };

    api.getFileSecure(cred, 'test.com', '/file');
    expect(mySpy).toHaveBeenCalledWith('test.com','/file', jasmine.any(Object));
  });
  it('Tests if the ApiService.getFile calls webService.getRequest with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "getRequest").and.stub();

    api.getFile( 'test.com', '/file');
    expect(mySpy).toHaveBeenCalledWith('test.com','/file', jasmine.any(Object));
  });
  it('Tests if the ApiService.putFile calls webService.postUpload with the correct parameters', () => {
    const mySpy = spyOn(api.webService, "postUpload").and.stub();
    const cred = {
      username:'user',
      password:'password'
    };
    api.postFile( cred, 'test.com', '/file', {});
    expect(mySpy).toHaveBeenCalledWith('test.com','/file', {}, jasmine.any(Object));
  });
});

describe('IdleService', () => {
  let idle: IdleService;

  beforeEach( () =>{
    TestBed.configureTestingModule({
      imports: [ServiceModule, RouterTestingModule.withRoutes([{path:'',component: DummyComponent}])],
      declarations: [DummyComponent]
    });
    idle = TestBed.get(IdleService);
  });
  it('Should create the Idle Service', () => {
    expect(idle).toBeTruthy();
  });
  it("should test the init function" , () => {
      const mySpy = spyOn(idle, "resetIdle").and.stub();
      idle.init(1,2,"test.com");
      expect(idle.redirectURL).toEqual("test.com");
      expect(mySpy).toHaveBeenCalled();
  });
  it('Should call onLogout when onTimeout is called', () => {
    const mySpy = spyOn(idle, "onLogout").and.stub();
    idle.onTimeout();
    expect(mySpy).toHaveBeenCalled();
  });
  it('Should handle a logout when onLogout is called', () => {
    idle.logoutConfirmation = null;
    idle.init(1,2,'');
    idle.onLogout();
    expect(idle.logoutConfirmation).not.toBeNull();
  });
  it('Should warn about an Idle logout on Idle Start', () => {
    idle.logoutWarning = null;
    idle.init(1,2,'');
    idle.onIdleStart();
    expect(idle.logoutWarning).not.toBeNull();
  });
  it('Should warn about an Idle logout in X seconds', () => {
    idle.logoutWarning = null;
    idle.onIdleWarning(10);
    expect(idle.logoutWarning).toBeNull();
    idle.onIdleStart(); // creates new notification
    idle.onIdleWarning(10);
    expect(idle.logoutWarning.content).toContain('10');
  });
  it( 'should logout on idle end', () => {
    idle.logoutWarning = null;
    idle.onIdleEnd();
    expect(idle.logoutWarning).toBeNull();
    idle.onIdleStart();
    idle.onIdleEnd();
    expect(idle.logoutWarning).not.toBeNull();
  });
  it("Idle instance should be defined",
    inject([Idle, NotificationsService, ApiService],
      (idle, notificationService, apiService) => {
      let idleService = new IdleService(idle, notificationService, TestBed.get(Router), apiService);
      idleService.init(3,3,'');
      expect(idleService).toBeDefined();
  }));
  it("onTimeout should call onLogout",
    inject([Idle, NotificationsService, ApiService],
      (idle, notificationService, apiService) => {
        let idleService = new IdleService(idle, notificationService, TestBed.get(Router), apiService);
        spyOn(idleService, 'onTimeout').and.callThrough();
        idleService.init(3,3,'');
        idleService.onTimeout();
        expect(idleService.onTimeout).toHaveBeenCalled();
      }));
  it("onIdleStart should set logoutWarning to the correct time",
    inject([Idle, NotificationsService, ApiService],
      (idle, notificationService, apiService) => {
        let idleService = new IdleService(idle, notificationService, TestBed.get(Router), apiService);
        spyOn(NotificationsService.prototype, 'warn').and.callThrough();
        let idleWarningTime = 3;
        idleService.init(3, idleWarningTime,'');
        idleService.onIdleStart();
        expect(NotificationsService.prototype.warn).toHaveBeenCalledWith('Logout Warning', '', { timeOut: idleWarningTime * 1000 });
      }));
  it("onIdleWarning should pass countdown to set logoutWarning content",
    inject([Idle, NotificationsService, ApiService],
      (idle, notificationService, apiService) => {
        let idleService = new IdleService(idle, notificationService, TestBed.get(Router), apiService);
        let countdown = 3;
        idleService.init(3, 3,'');
        idleService.onIdleStart();
        idleService.onIdleWarning(countdown);
        expect(idleService.logoutWarning.content).toEqual("You will be logged out of this application in " + countdown + " seconds due to inactivity");
      }));
  it("onIdleEnd should remove logoutWarning",
    inject([Idle, NotificationsService, ApiService],
      (idle, notificationService, apiService) => {
        let idleService = new IdleService(idle, notificationService, TestBed.get(Router), apiService);
        spyOn(NotificationsService.prototype, 'remove').and.callThrough();
        idleService.init(3, 3,'');
        idleService.onIdleStart();
        idleService.onIdleWarning(3);
        idleService.onIdleEnd();
        expect(NotificationsService.prototype.remove).toHaveBeenCalledWith(idleService.logoutWarning.id);
      }));
  it("clearLogoutConfirmation should remove logoutConfirmation",
    inject([Idle, NotificationsService, ApiService],
      (idle, notificationService, apiService) => {
        let idleService = new IdleService(idle, notificationService, TestBed.get(Router), apiService);
        spyOn(NotificationsService.prototype, 'remove').and.callThrough();
        idleService.init(3, 3,'');
        idleService.onTimeout();
        idleService.clearLogoutConfirmation();
        expect(NotificationsService.prototype.remove).toHaveBeenCalledWith(idleService.logoutConfirmation.id);
      }));
});

