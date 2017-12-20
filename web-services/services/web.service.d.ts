import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export declare type Json = {} | any;
export declare class WebService {
    private http;
    private ReadHeaders;
    private WriteHeaders;
    private requestOptions;
    static blobResponseHandler(response: Response): Blob;
    static arrayBufferResponseHandler(response: Response): ArrayBuffer;
    static httpResponseHandler(response: Response): string;
    static jsonResponseHandler(response: Response): Json;
    static errorResponseHandler(response: Response): ErrorObservable;
    constructor(http: Http);
    /**
     * Gets the default Headers for read (get) webservice access
     * @method readHeaders
     * @return {Headers} the read Headers for the application webservices
     */
    readonly readHeaders: Headers;
    /**
     * Gets the default Headers for write (post, put, patch, delete) webservice access
     * @method writeHeaders
     * @return {Headers} the write Headers for the application webservices
     */
    readonly writeHeaders: Headers;
    getRequest(origin: string, resource: string, requestOptions?: RequestOptionsArgs): Observable<Response | any>;
    exportGetRequest(origin: string, resource: string, header_type: string): Observable<Response | any>;
    postRequest(origin: string, resource: string, body: {}, headers?: Headers): Observable<Response | any>;
    postUpload(origin: string, resource: string, data: Blob, myHeaders: Headers): Observable<Response | any>;
    putRequest(origin: string, resource: string, body: {}, headers?: Headers): Observable<Response | any>;
    patchRequest(origin: string, resource: string, body: {}, headers?: Headers): Observable<Response | any>;
    deleteRequest(origin: string, resource: string, headers?: Headers): Observable<Response | any>;
}
