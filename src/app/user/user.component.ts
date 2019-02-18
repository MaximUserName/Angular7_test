import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { User } from '../_models/user';

@Component({
    templateUrl: 'user.component.html',
    
})
export class UserComponent implements OnInit {
    currentUser: User;

    constructor(private authenticationService: AuthenticationService){

    }

    ngOnInit(): void {
        this.currentUser = this.authenticationService.currentUserValue;
    }
    
}