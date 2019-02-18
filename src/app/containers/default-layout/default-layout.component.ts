import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems, navDataObj } from './../../_nav';
import { httpService } from '../../services';
import { AuthenticationService } from '../../_services';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../_models/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public authData: any;
  currentUser: User;

  constructor(
    
    private service: httpService,
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
    // this.authData = this.service.getAuthData();
    this.authData = this.authenticationService.currentUserValue.authData;
    let role = this.authenticationService.currentUserValue.role;
    this.service.post(`${environment.apiSite}/api/common/menu/list/${role}`, this.authData, 'authHeader', true).subscribe((response) => {
console.log(response);
this.navItems = [];
response.forEach(element => {
  this.navItems.push(new navDataObj(element.name,element.icon,element.url,element.childmenu))
});
    }, (err) => {
      alert('login error')
    }
    )
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    console.log('inside logout');
    console.log(this.currentUser);
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
