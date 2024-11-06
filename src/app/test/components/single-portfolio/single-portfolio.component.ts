import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-portfolio',
  templateUrl: './single-portfolio.component.html',
  styleUrl: './single-portfolio.component.scss'
})
export class SinglePortfolioComponent {
  constructor(private router: Router){}
  navigate() {
    this.router.navigate(['/contact_us']);
  }

}
