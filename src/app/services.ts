import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import {  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class httpService {
     httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        authHeader: {}
      };
      authData :any;
    constructor(private http: HttpClient) {}

    post(url,data,header,token):Observable<any>{
        let dataVal ={

        }
        let options
        if(token){
            dataVal ={
                name:'name 1',
                parent_id:'1',
                name_native:'name_native 1',
                type:'DIVISION'
            };
             options = {
                headers: new HttpHeaders().set('Authorization', data.tokenType+' '+data.accessToken)
            } 
        }else{
            dataVal = data;
            options = this.httpOptions;
        }
        return this.http.post(url,dataVal,options)
        .pipe(catchError((err: Response | any) => {
            return Observable.throw(err);
        }))
    }
    setAuthData(data){
        this.authData = data;
    };
    getAuthData(){
        return this.authData;
    }
}