import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavParentComponent } from './components/nav-parent/nav-parent.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { SearchbarComponent } from './components/searchbar/searchbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavParentComponent,
    SearchbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule
  ]
})
export class DashboardModule { }