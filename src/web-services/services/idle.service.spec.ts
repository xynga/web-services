import { IdleService } from './idle.service';
import {TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ServiceModule} from './service.module';
import {Component} from '@angular/core';

@Component({
  template: ''
})
class DummyComponent {
}
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
});
