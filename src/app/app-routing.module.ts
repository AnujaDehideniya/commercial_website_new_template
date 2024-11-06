import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from './auth/service/auth.gurd';
import { IsLogResolver } from './auth/resolvers/is_log.resolver';
// import { NotFoundComponent } from './common/components/not-found/not-found.component';

const routes: Routes = [
  // {
  //   path: '',
  //    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  // //  canActivate:[canActivate]
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      canActivate:[IsLogResolver]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
   canActivate:[canActivate]
  },
  {
    path: '',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule),
   //canActivate:[canActivate]
  },
  // {
  //   path: '**',
  //   component:NotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
