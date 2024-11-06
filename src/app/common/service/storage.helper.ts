import { Injectable } from "@angular/core";
import { NextCallback, ErrorCallback } from "./service.helper";
import { UserTokenModel } from "../../auth/models/user-token.model";

@Injectable({
    providedIn: 'root'
})

export class StorageHelper {

    add(key: string, value: Object) {
        const encrypted = JSON.stringify(value);
        localStorage.setItem(key, encrypted);
    }

    get(key: string): Object | null {
        try {
            let payload = localStorage.getItem(key);
            return payload?JSON.parse(payload):null;
        } catch (error) {
            return null
        }
    }

    clear(key: string) {
        localStorage.removeItem(key);
    }

    clearAll() {
        localStorage.clear();
    }
}

