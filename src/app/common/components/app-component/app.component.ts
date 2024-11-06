import { Component, OnInit } from '@angular/core';
import { DeviceDetectionService } from '../../service/device-detection.service';
import { ServiceHelper } from '../../service/service.helper';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { SpinnerService } from '../../../spinner/spinner.service';
import { Route } from '@angular/router';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  showNavbar = true; 
  showFooter = true; 

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public spinnerService: SpinnerService,
    private serviceHelper: ServiceHelper,
    private router: Router // Inject Router to detect navigation
  
  ){}
  ngOnInit(): void {
    // Subscribe to router events to show/hide spinner during navigation
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show(); // Show spinner on navigation start
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.spinnerService.hide(); // Hide spinner on navigation end, cancel, or error
      }

      if (event instanceof NavigationEnd){
        const currentUrl = event.url;
        this.showNavbar = !(currentUrl ==='/login' || currentUrl ==='/home');
        this.showFooter = this.showNavbar;
      }
      
    });
  }
}






