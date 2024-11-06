import { Injectable } from "@angular/core";
import { NextCallback, ErrorCallback, ServiceHelper } from "../../common/service/service.helper"; 
import { AuthModel } from "../models/auth.model"; 
import { TokenModel } from "../models/token.model"; 
import { ErrorModel } from "../../common/models/common/error.model"; 
import { AuthService } from "./auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UserTokenModel } from "../models/user-token.model";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private _: ServiceHelper, private _auth: AuthService) { }
    /**
     * Login user
     * @param callback success result callback
     * @param error error callback | if error use error hadler to haddle error
     * @param data login payload
     */
  
    tryToLogIn(callback: NextCallback<UserTokenModel>, error: ErrorCallback<HttpErrorResponse>, data: AuthModel) {
   
        this._auth.login(callback, error, data)
    }
    // tryToRequestPasswordChange(callback: NextCallback<UserTokenModel>, error: ErrorCallback<HttpErrorResponse>, data: string) {
    //     this._auth.requestPasswordChange(callback, error, data)
    // }
    // tryToResetPasswordChange(callback: NextCallback<UserTokenModel>, error: ErrorCallback<HttpErrorResponse>, data: string) {
    //     this._auth.resetPassword(callback, error, data)
    // }
}