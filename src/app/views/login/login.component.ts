import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup, AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {httpService} from '../../services';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../../_services';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 
  returnUrl: string;
  error = '';
  loading: boolean;

  constructor( 
    private service:httpService, 
    private router:Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ){}
  loginForm = new FormGroup({
  username:new FormControl(''),
  password: new FormControl('')
});

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

  onLogin(){
    if(!this.loginForm.valid){
      return
    }

    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.error = error;
              this.loading = false;
              alert('login error');
          });

    // this.service.post('http://34.211.99.182/api/auth/signin',this.loginForm.value,'header',false)
    // .subscribe((response)=>{
    //   this.service.setAuthData(response);
    //   this.router.navigate(['dashboard']);
    // },(err) =>{
    //   alert('login error')
    // }
    // )
  }

  ngOnInit(){
     // reset login status
     this.authenticationService.logout();

     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
