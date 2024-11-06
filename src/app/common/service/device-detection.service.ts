// device-detection.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectionService {
 

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any)['opera'];
    // Regular expression to check if the user agent string contains mobile keywords
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

    if (window.innerWidth <= 990) {
      return true;
  } else{
    return false;
  }
   
  }
}
