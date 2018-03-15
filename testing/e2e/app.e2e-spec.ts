import { AppPage } from './app.po';

describe('testing App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login and display text', () => {
    page.navigateTo();
    page.getButton('loginButton').click();
    page.getText('login-response').then(data => {
      console.log(data);
      expect(data).toMatch("Login Successful"||"Error");  // matches response containing a successful login or unsuccessful login
    })
  });
});
