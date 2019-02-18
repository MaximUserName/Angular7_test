import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        let authServerUrl = environment.apiSite;
        return this.http.post<any>(`${authServerUrl}/api/auth/signin`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.accessToken) {
                    console.log(user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let cUser: User = new User();
                    cUser.username = username;
                    cUser.role = user.authorities[0].authority
                    cUser.token = user.accessToken;
                    cUser.authData = user;
                    localStorage.setItem('currentUser', JSON.stringify(cUser));
                    this.currentUserSubject.next(cUser);
                    return cUser;
                }

                return null;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}