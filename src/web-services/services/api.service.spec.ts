import {ServiceModule} from './service.module';
import {CanonicalUser} from '../models/canonical-user.model';
import {UpdateCanonicalUserRequest} from '../models/canonical-user.model';
import {TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';

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
