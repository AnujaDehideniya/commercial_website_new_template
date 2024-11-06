import { Injectable } from "@angular/core";
import { NextCallback, ErrorCallback } from "../../common/service/service.helper";
import { UserTokenModel } from "../models/user-token.model";
import { StorageHelper } from "../../common/service/storage.helper";
import { AuthModel } from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})

export class AuthStorageHelper {
 
   
    constructor(private _storageHelper: StorageHelper) { }

    add_user(value: UserTokenModel) {
       try{
        if(this.get_user()){
            this.clear_user() 
        }
       }finally{
        this._storageHelper.add('user', value)
       }
        
        
    }
    get_user(): UserTokenModel | null {
        try {
            let payload = new UserTokenModel(this._storageHelper.get('user'));

            if (payload instanceof UserTokenModel) {
                return payload;
            } else {
                return null;
            }
        } catch (error) {
            return null
        }
    }
    clear_user() {
        this._storageHelper.clear('user');
    }
    // add_remember_me(data: AuthModel): void {
    //     this._storageHelper.clear("rememberMe");
    //     this._storageHelper.add("rememberMe", data);
    // }
     get_remember_me(): AuthModel | null {
        if(this._storageHelper.get("rememberMe")){
            const section = <AuthModel>this._storageHelper.get("rememberMe");
            if (section) {
                return section;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    clear_remember_me(): void {
        this._storageHelper.clear("rememberMe");
    }
 
}

