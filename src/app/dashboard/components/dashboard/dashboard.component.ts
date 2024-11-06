import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../../auth/service/auth.service';
import { AuthStorageHelper } from '../../../auth/service/auth-storage.helper';
import { UserTokenModel } from '../../../auth/models/user-token.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('drawer') drawer: MatSidenav | undefined;

  user:UserTokenModel |null;
  canToggle:boolean=true;
  constructor(private router: Router,private _store: AuthStorageHelper,private _auth_service: AuthService,private location: Location){
      this.user=this._store.get_user();
      router.events.subscribe((val) => {
        if(this.location.path() == '/dashboard/session/appointment'){
          if(this.canToggle){
            this.canToggle=false;
            this.drawer?.toggle();
          }
        } else{
          this.canToggle=true;
        }
      });
  }
  ngOnInit(): void {
    
  }
 
  ngAfterViewInit(): void {
      this.drawer?.toggle()
}
logout() {
  this._auth_service.logOut();
  this.router.navigate(['auth/login']);
  }
}
