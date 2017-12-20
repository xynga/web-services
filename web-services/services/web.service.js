import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
var WebService = /** @class */ (function () {
    function WebService(http) {
        this.http = http;
        this.requestOptions = { withCredentials: true };
        this.ReadHeaders = new Headers();
        this.ReadHeaders.append('Endpoint-Access', 'authorization/basic'); // fake header to force withCredentials:true basic authorization
        this.WriteHeaders = new Headers();
        this.WriteHeaders.append('Content-Type', 'application/json');
    }
    WebService.blobResponseHandler = function (response) {
        return response.blob() || new Blob();
    };
    WebService.arrayBufferResponseHandler = function (response) {
        return response.arrayBuffer() || new ArrayBuffer(0);
    };
    WebService.httpResponseHandler = function (response) {
        return response.text() || '';
    };
    WebService.jsonResponseHandler = function (response) {
        return response.json() || {};
    };
    WebService.errorResponseHandler = function (response) {
        if (!response) {
            console.error('Error: no webservice response');
        }
        else {
            console.error(response);
            // todo: add test in case no headers are returned due to Angular not understanding
            // the returned Content-Type (e.g. text/cvs --- instead of text/csv)
            var contentType = response.headers.get('content-type') || ''; // the ! - Non-null assertion operator is needed to coerce away typescript compiler error
            contentType = contentType.substring(0, (contentType + ';').indexOf(';'));
            var error = void 0;
            if ('text/html' === contentType) {
                error = response.text() || '';
            }
            else if ('application/json' === contentType) {
                error = JSON.stringify(response.json());
            }
            else {
                // handle when the Content-Type is missing or not recognized
                // for instance: Angular not understanding the returned Content-Type (e.g. text/cvs instead of text/csv)
                error = 'Unrecognized error response Content-Type: \"' + contentType + '\"';
            }
            console.error(response.status + " " + (response.statusText || '') + " " + (error || ''));
            console.dir(response);
        }
        return Observable.throw(response);
    };
    Object.defineProperty(WebService.prototype, "readHeaders", {
        /**
         * Gets the default Headers for read (get) webservice access
         * @method readHeaders
         * @return {Headers} the read Headers for the application webservices
         */
        get: function () {
            return this.ReadHeaders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebService.prototype, "writeHeaders", {
        /**
         * Gets the default Headers for write (post, put, patch, delete) webservice access
         * @method writeHeaders
         * @return {Headers} the write Headers for the application webservices
         */
        get: function () {
            return this.WriteHeaders;
        },
        enumerable: true,
        configurable: true
    });
    WebService.prototype.getRequest = function (origin, resource, requestOptions) {
        if (!requestOptions) {
            requestOptions = this.requestOptions;
        }
        requestOptions.method = RequestMethod.Get;
        if (ResponseContentType.Blob === requestOptions.responseType) {
            return this.http.get(origin + resource, requestOptions)
                .map(WebService.blobResponseHandler)
                .catch(WebService.errorResponseHandler);
        }
        else if (ResponseContentType.Json === requestOptions.responseType) {
            return this.http.get(origin + resource, requestOptions)
                .map(WebService.jsonResponseHandler)
                .catch(WebService.errorResponseHandler);
        }
        else {
            requestOptions.headers = this.readHeaders;
            if (ResponseContentType.ArrayBuffer === requestOptions.responseType) {
                return this.http.get(origin + resource, requestOptions)
                    .map(WebService.arrayBufferResponseHandler)
                    .catch(WebService.errorResponseHandler);
            }
            else if (ResponseContentType.Text === requestOptions.responseType) {
                return this.http.get(origin + resource, requestOptions)
                    .map(WebService.httpResponseHandler)
                    .catch(WebService.errorResponseHandler);
            }
            else {
                console.error('ERROR: requestOptionsArgs.responseType: \'' + requestOptions.responseType + '\'');
                console.error('Supported types are: ResponseContentType.Blob, ' +
                    'ResponseContentType.Json, ResponseContentType.ArrayBuffer, or ResponseContentType.Text');
            }
        }
        return new Observable();
    };
    WebService.prototype.exportGetRequest = function (origin, resource, header_type) {
        var headers = new Headers;
        headers.append('Accept', header_type);
        this.requestOptions.headers = headers;
        this.requestOptions.method = RequestMethod.Get;
        this.requestOptions.responseType = ResponseContentType.Blob;
        return this.http.get(origin + resource, this.requestOptions)
            .map(WebService.blobResponseHandler)
            .catch(WebService.errorResponseHandler);
    };
    WebService.prototype.postRequest = function (origin, resource, body, headers) {
        if (headers === void 0) { headers = this.WriteHeaders; }
        this.requestOptions.headers = headers;
        return this.http.post(origin + resource, JSON.stringify(body), this.requestOptions)
            .map(WebService.jsonResponseHandler)
            .catch(WebService.errorResponseHandler);
    };
    WebService.prototype.postUpload = function (origin, resource, data, myHeaders) {
        this.requestOptions = { withCredentials: true };
        this.requestOptions.headers = myHeaders;
        return this.http.post(origin + resource, data, this.requestOptions);
    };
    WebService.prototype.putRequest = function (origin, resource, body, headers) {
        if (headers === void 0) { headers = this.WriteHeaders; }
        this.requestOptions.headers = headers;
        return this.http.put(origin + resource, JSON.stringify(body), this.requestOptions)
            .map(WebService.jsonResponseHandler)
            .catch(WebService.errorResponseHandler);
    };
    WebService.prototype.patchRequest = function (origin, resource, body, headers) {
        if (headers === void 0) { headers = this.WriteHeaders; }
        this.requestOptions.headers = headers;
        return this.http.patch(origin + resource, JSON.stringify(body), this.requestOptions)
            .map(WebService.jsonResponseHandler)
            .catch(WebService.errorResponseHandler);
    };
    WebService.prototype.deleteRequest = function (origin, resource, headers) {
        if (headers === void 0) { headers = this.WriteHeaders; }
        this.requestOptions.headers = headers;
        return this.http.delete(origin + resource, this.requestOptions)
            .map(WebService.jsonResponseHandler)
            .catch(WebService.errorResponseHandler);
    };
    WebService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebService.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    return WebService;
}());
export { WebService };
//# sourceMappingURL=web.service.js.map