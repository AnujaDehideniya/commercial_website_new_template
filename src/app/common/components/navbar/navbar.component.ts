import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router:any;
  constructor(router:Router){
    this.router=router;
  }
  navigate(link:string){
  this.router.navigate([link])
  }

}
