import { Injectable } from '@angular/core';
import { Headers, ResponseContentType } from '@angular/http';
import { WebService } from './web.service';
var ApiService = /** @class */ (function () {
    function ApiService(webService) {
        this.webService = webService;
        this.securedJsonRequestOptions = {
            withCredentials: true,
            responseType: ResponseContentType.Json
        };
        this.securedBlobRequestOptions = {
            withCredentials: true,
            responseType: ResponseContentType.Blob
        };
        this.blobRequestOptions = {
            withCredentials: false,
            responseType: ResponseContentType.Blob
        };
    }
    /**
     * Gets the user authentication state by logging in
     * @method getLogin
     * @param Credentials - interface containing the username and password of the user to log in
     * @return {Observable} an observable that returns the requested user or an error
     */
    ApiService.prototype.getLogin = function (credentials, origin, path) {
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + window.btoa(credentials.username + ':' + credentials.password));
        return this.webService.getRequest(origin, path, Object.assign({ headers: headers }, this.securedJsonRequestOptions));
    };
    ApiService.prototype.putPassword = function (origin, path, userID, credentials) {
        return this.webService.patchRequest(origin, path + userID, { 'password': credentials.password });
    };
    /**
     * Delete the user authentication state (logs out)
     * @method getLogout
     * @return {Observable} an observable that returns the requested report or an error
     */
    ApiService.prototype.putLogout = function (origin, path) {
        return this.webService.deleteRequest(origin, path);
    };
    /**
     * Get the users with the specified user id
     * @method getUser
     * @return {Observable} an observable that returns the requested user or an error
     */
    ApiService.prototype.getUser = function (origin, path, userID) {
        return this.webService.getRequest(origin, path + userID, this.securedJsonRequestOptions);
    };
    /**
     * Get the list of users that the authenticate administrator is allowed to see
     * @method getUsers
     * @return {Observable} an observable that returns the requested user list or an error
     */
    ApiService.prototype.getUsers = function (origin, path) {
        return this.webService.getRequest(origin, path, this.securedJsonRequestOptions);
    };
    ApiService.prototype.updateUser = function (origin, path, user) {
        return this.webService.patchRequest(origin, path + user.id, user);
    };
    ApiService.prototype.addUser = function (origin, path, user) {
        return this.webService.postRequest(origin, path, user);
    };
    /**
     * Get the list of users that the authenticate user is allowed to see
     * @method getUsersBasics
     * @return {Observable} an observable that returns the requested user list or an error
     */
    ApiService.prototype.getUsersBasics = function (origin, path) {
        return this.webService.getRequest(origin, path, this.securedJsonRequestOptions);
    };
    ApiService.prototype.getFileSecure = function (credentials, origin, path) {
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + window.btoa(credentials.username + ':' + credentials.password));
        return this.webService.getRequest(origin, path, Object.assign({ headers: headers }, this.securedBlobRequestOptions));
    };
    ApiService.prototype.getFile = function (origin, path) {
        return this.webService.getRequest(origin, path, this.blobRequestOptions);
    };
    ApiService.prototype.postFile = function (credentials, origin, path, data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/octet-stream");
        headers.append('Authorization', 'Basic ' + window.btoa(credentials.username + ':' + credentials.password));
        var blobData = new Blob([data]);
        return this.webService.postUpload(origin, path, blobData, headers);
    };
    ApiService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: WebService, },
    ]; };
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map