import { AppPage } from './app.po';

describe('testing App', () => {
  let page: AppPage;
  let path = require('path');

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display text after login', () => {
    page.navigateTo();
    page.getButton('loginButton').click();
    page.getText('login-response').then(data => {
      expect(data).toMatch("Login Successful"||"Error");
    })
  });
  it('should display text after logout', () => {
    page.getButton('logoutButton').click();
    page.getText('logout-response').then(data => {
      expect(data).toMatch("Logout Successful"||"Error");
    })
  });
  it('should display text after getting user', () => {
    page.getButton('getUserButton').click();
    page.getText('get-user-response').then(data => {
      expect(data).toMatch("Get User Successful"||"Error");
    })
  });
  it('should display text after getting users', () => {
    page.getButton('getUsersButton').click();
    page.getText('get-users-response').then(data => {
      expect(data).toMatch("Get Users Successful"||"Error");
    })
  });
  it('should display text after adding user', () => {
    page.getButton('addUserButton').click();
    page.getText('add-user-response').then(data => {
      expect(data).toMatch("Add User Successful"||"Error");
    })
  });
  it('should display text after updating user', () => {
    page.getButton('updateUserButton').click();
    page.getText('update-user-response').then(data => {
      expect(data).toMatch("Update User Successful"||"Error");
    })
  });
  it('should display text after uploading file', () => {
    let fileToUpload = './test.txt', absolutePath = path.resolve(__dirname, fileToUpload);
    page.getFileInputEl().sendKeys(absolutePath);
    page.getButton("uploadFileButton").click();
    page.getText('file-upload-response').then(data => {
      expect(data).toMatch("Upload File Successful"||"Error");
    })
  });
  it('should display text after downloading file', () => {
    page.getButton('downloadFileButton').click();
    page.getText('file-download-response').then(data => {
      expect(data).toMatch("Download File Successful"||"Error");
    })
  });
  it('should display text after going idle', () => {
    page.getButton('idleButton').click();
    page.getText('idle-service-response').then(data => {
      expect(data).toMatch("Idle Service Successful"||"Error");
    })
  });
});
