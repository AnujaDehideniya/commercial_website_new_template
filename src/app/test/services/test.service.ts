import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }
data:string=""
  get(test:string) {
    this.data=test;
    return test+' test';
  }
}
