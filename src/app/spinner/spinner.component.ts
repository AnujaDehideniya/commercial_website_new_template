import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  styleUrl: './spinner.component.scss',
  template:`<div *ngIf="isLoading | async" class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`
})
export class SpinnerComponent {
    isLoading = this.spinnerService.loading$; // Subscribing to loading observable
    constructor(private spinnerService: SpinnerService) {}



}
