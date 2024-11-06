import { Injectable, inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _auth = inject(AuthService);
    const _router = inject(Router);

    if (!_auth.isLoggedIn) {
        _auth.logOut();
        _router.navigate(['auth/login']);
        return false;
    }else{
   
        
    }

    // check user permissions

    return true
    
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);