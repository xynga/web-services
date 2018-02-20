import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpParams } from "@angular/common/http";


@Injectable()
export class OauthService {

    getOAuthURL(url: string,
                   client_id: string,
                   redirect_uri: string,
                   response_type: string,
                   scope: string,
                   state?: string,
                   include_granted_scopes?: string,
                   login_hint?: string,
                   prompt?: string): string{
        let requestURL = url;
        if(requestURL.substr(requestURL.length - 1 ) != "?"){
            requestURL = requestURL + "?";
        }
        
        requestURL = requestURL + 
                     "client_id=" + client_id + "&" +
                     "redirect_uri=" + redirect_uri + "&" +
                     "response_type=" + response_type + "&" +
                     "scope=" + scope;
        
        if(state != null){
            requestURL = requestURL + "&state=" + state;
        }

        if(include_granted_scopes != null){
            requestURL = requestURL + "&include_granted_scopes=" + include_granted_scopes;
        }

        if(login_hint != null){
            requestURL = requestURL + "&login_hint=" + login_hint;
        }

        if(prompt != null){
            requestURL = requestURL + "&prompt=" + prompt;
        }
        return requestURL;
    }

    getAccessToken(fragment: string): string{

            let access_token = fragment.match(new RegExp('(?:access_token=)(.*?)(?:&)'));
            if(access_token != null && access_token[1] != null) {
                return access_token[1];
            }else{
                return 'No Access Token found.';
            }

    }



}
