import { Observable } from 'rxjs/Observable';
import { WebService } from './web.service';
import { CanonicalUser, Credentials, UpdateCanonicalUserRequest } from "../models/canonical-user.model";
export declare class ApiService {
    private webService;
    private securedJsonRequestOptions;
    private securedBlobRequestOptions;
    private blobRequestOptions;
    constructor(webService: WebService);
    /**
     * Gets the user authentication state by logging in
     * @method getLogin
     * @param Credentials - interface containing the username and password of the user to log in
     * @return {Observable} an observable that returns the requested user or an error
     */
    getLogin(credentials: Credentials, origin: string, path: string): Observable<{}>;
    putPassword(origin: string, path: string, userID: string, credentials: Credentials): Observable<{}>;
    /**
     * Delete the user authentication state (logs out)
     * @method getLogout
     * @return {Observable} an observable that returns the requested report or an error
     */
    putLogout(origin: string, path: string): Observable<{}>;
    /**
     * Get the users with the specified user id
     * @method getUser
     * @return {Observable} an observable that returns the requested user or an error
     */
    getUser(origin: string, path: string, userID: string): Observable<{}>;
    /**
     * Get the list of users that the authenticate administrator is allowed to see
     * @method getUsers
     * @return {Observable} an observable that returns the requested user list or an error
     */
    getUsers(origin: string, path: string): Observable<{}>;
    updateUser(origin: string, path: string, user: UpdateCanonicalUserRequest): Observable<any>;
    addUser(origin: string, path: string, user: CanonicalUser): Observable<any>;
    /**
     * Get the list of users that the authenticate user is allowed to see
     * @method getUsersBasics
     * @return {Observable} an observable that returns the requested user list or an error
     */
    getUsersBasics(origin: string, path: string): Observable<{}>;
    getFileSecure(credentials: Credentials, origin: string, path: string): Observable<{}>;
    getFile(origin: string, path: string): Observable<{}>;
    postFile(credentials: Credentials, origin: string, path: string, data: any): Observable<{}>;
}
