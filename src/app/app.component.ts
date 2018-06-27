import { Component } from '@angular/core';
import {ApiService, CanonicalUser, IdleService} from '../web-services';

interface ResponseMessage {
  message: string;
  color?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  origin = 'https://97t84zz7m9.execute-api.us-east-2.amazonaws.com/usintomockapi';

  // working username and password for the mock API
  username = 'user';
  password = 'password';

  loginResponse: ResponseMessage= {message: ''};
  logoutResponse: ResponseMessage= {message: ''};
  getUserResponse: ResponseMessage= {message: ''};
  getUsersResponse: ResponseMessage= {message: ''};
  addUserResponse: ResponseMessage= {message: ''};
  updateUserResponse: ResponseMessage= {message: ''};
  uploadResponse: ResponseMessage= {message: ''};
  downloadResponse: ResponseMessage= {message: ''};
  idleResponse: ResponseMessage= {message: ''};

  myFile;

  defaultTextColor = '#000000';
  errorTextColor = '#FF0000';

  errorCount = 0;

  newUser: CanonicalUser = {
    'id': 'user',
    'first': 'New',
    'middle': 'User',
    'last': 'Created',
    'initials': 'NUC',
    'phone': '8917430594'
  };

  constructor(private apiService: ApiService, private idleService: IdleService) {}

  testAll() {
    this.login();
    this.logout();
    this.getUser();
    this.getUsers();
    this.addUser();
    this.updateUser();
    this.downloadFile();
    this.idle();
  }

  login() {
    this.username = 'user';
    this.password = 'password';

    this.apiService.getLogin({username: this.username, password: this.password},
      this.origin, '/canonical-users/login').subscribe(
      (res) => {
        this.loginResponse = {message: 'Login Successful',
          color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.loginResponse = {message: 'Error: login was unsuccessful. ' +
          'Make sure the origin and path for the endpoint is correct, and that you are sending the user\'s credentials.',
        color: this.errorTextColor};
      }
    );
  }

  logout() {
    this.apiService.putLogout(this.origin, '/canonical-users/logout').subscribe(
      (res) => {
        this.logoutResponse = {message: 'Logout Successful',
          color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.logoutResponse = {message: 'Error: logout unsuccessful. ' +
          'Make sure the origin and path for the endpoint is correct.',
          color: this.errorTextColor};
      }
    );
  }

  getUser() {
    this.apiService.getUser(this.origin, '/canonical-users/id/', 'user').subscribe(
      (res) => {
        this.getUserResponse = {message: 'Get User Successful',
          color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.getUserResponse = {message: 'Error: Get User Unsuccessful. ' +
          'Make sure the origin and path for the endpoint is correct, and that you are passing an existing user\'s ID.',
          color: this.errorTextColor};
      }
    );
  }

  getUsers() {
    this.apiService.getUsers(this.origin, '/canonical-users/').subscribe(
      (res) => {
        this.getUsersResponse = {message: 'Get Users Successful',
        color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.getUsersResponse = {message: 'Error: Get Users Unsuccessful. ' +
        'Make sure the origin and path for the endpoint is correct.',
        color: this.errorTextColor};
      }

    );
  }

  addUser() {
    this.apiService.addUser(this.origin, '/canonical-users/', this.newUser).subscribe(
      (res) => {
        this.addUserResponse = {message: 'Add User Successful',
        color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.addUserResponse = {message: 'Error: Add User Unsuccessful. ' +
        'Make sure the origin and path for the endpoint is correct, and that a CanonicalUser object is being sent in the request.',
        color: this.errorTextColor};
      }
    );
  }

  updateUser() {
    this.apiService.updateUser(this.origin, '/canonical-users/update/', this.newUser).subscribe(
      (res) => {
        this.updateUserResponse = {message: 'Update User Successful',
          color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.updateUserResponse = {message: 'Error: Update User Unsuccessful. ' +
        'Make sure the origin and path for the endpoint is correct, and that a CanonicalUser object is being sent in the request.',
        color: this.errorTextColor};
      }
    );
  }

  change(event: any) {
    this.myFile = event.target.files;
  }

  uploadFile() {
    const filename: string = this.myFile[0].name;
    this.apiService.postFile({username: this.username, password: this.password}, this.origin,
      '/canonical-users/file/' + filename, this.myFile[0]).subscribe(
      (res) => {
        this.uploadResponse = {message: 'Upload File Successful',
        color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.uploadResponse = {message: 'Error: Upload File Unsuccessful. ' +
        'Make sure the origin and path for the endpoint is correct, and that a file is being sent in the request. ' + err,
        color: this.errorTextColor};
      }
    );
  }

  downloadFile() {
    // retrieve a generic test file called fileTest.txt that exists on the mock API resource
    this.apiService.getFile(this.origin, '/canonical-users/file/' + 'fileTest.txt').subscribe(
      (res) => {
        this.downloadResponse = {message: 'Download File Successful',
          color: this.defaultTextColor};
      },
      (err) => {
        this.errorCount += 1;
        this.downloadResponse = {
          message: 'Error: Download File Unsuccessful. ' +
          'Make sure the origin and path for the endpoint is correct.',
          color: this.errorTextColor
        };
      }
    );
  }

  idle() {
    try {
      this.idleService.init(0.1, 0, '');
      this.idleService.onTimeout();
      this.idleResponse = {message: 'Idle Service Successful', color: this.defaultTextColor};
    } catch (e) {
      this.errorCount += 1;
      this.idleResponse = {message: 'Error: Idle Service cannot be called. Error message: ' + e.message, color: this.errorTextColor};
    }
  }
}
