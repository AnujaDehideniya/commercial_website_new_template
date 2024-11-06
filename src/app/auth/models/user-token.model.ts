import { TokenModel } from "./token.model";


export class UserTokenModel {
    address: string;
    location_name: string;
    town: string;
    tokens: Array<TokenModel>;
    

    constructor(obj: any) {
        this.address = obj.address
        this.location_name = obj.location_name
        this.town = obj.town
        this.tokens = obj.tokens
       
    }
    
    
}