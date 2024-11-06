import { ResolveFn } from '@angular/router';
import { AuthStorageHelper } from '../service/auth-storage.helper';
import { StorageHelper } from '../../common/service/storage.helper';
import { AuthModel } from '../models/auth.model';

export const loginResolver: ResolveFn<AuthModel|null> = (route, state) => {
 if(new AuthStorageHelper(new StorageHelper()).get_remember_me()){
  return new AuthStorageHelper(new StorageHelper()).get_remember_me();
 }else{
  return null;
 }
 
};
