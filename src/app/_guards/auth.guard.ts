import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { httpService } from '../services';
import { AuthenticationService } from '../_services';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService)
    {
    }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
            // logged in so return true
            let role = this.getUserRole(currentUser);
            console.log(role);
            if(role == 'ROLE_ADMIN'){
                return true;
            } else if(role == 'ROLE_USER'){
                // this.router.navigate(['/user']);
                // console.log(route);
                if(route.routeConfig.path == 'user'){
                    return true;
                } else {
                    // this.router.navigateByUrl('/user');
                    this.router.navigate(['/user']);
                    return false;
                }
                // this.router.navigateByUrl('/user');
                // return true;
                // if(route.url.toString().indexOf('/user') != -1)
                // {
                //     this.router.navigate(['/user']);
                //     return true;
                // }
                //  return false;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;

        // var data = this.httpService.getAuthData();
        // //console.log(data);
        // //console.log(data.authorities.any());
        // console.log(data.authorities[0].authority);
        // if(data.authorities[0].authority == 'ROLE_ADMIN'){
        //     return true;
        // }
        // if(data.authorities[0].authority == 'ROLE_USER'){
        //     this.router.navigate(['/user']);
        // }
        // return false;
    }

    getUserRole(user: User): string {
        return user.role;
    }
}