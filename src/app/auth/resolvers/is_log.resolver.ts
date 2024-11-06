import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStorageHelper } from '../service/auth-storage.helper';
import { StorageHelper } from '../../common/service/storage.helper';
import { AuthModel } from '../models/auth.model';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const IsLogResolver: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);

  if (_auth.isLoggedIn) {

      _router.navigate(['dashboard/today_session']);
      return false;
  }

  // check user permissions

  return true
  
};
