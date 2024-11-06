import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { loginResolver } from './resolvers/login.resolver';

const routes: Routes = [
  { path: '', component: LoginComponent,resolve: { resoledData:loginResolver} },
  { path: 'login', component: LoginComponent,resolve: { resoledData:loginResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
