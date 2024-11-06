import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '', component: DashboardComponent,
    children: [
      // { path: 'session', loadChildren: () => import('../today_session/today_session.module').then(m => m.TodaySessionModule) },
      // { path: 'reports', loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule) },
      // { path: 'appointment', loadChildren: () => import('../appointment/appointment').then(m => m.AppoinmentModule) }
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
