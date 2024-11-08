
import { catchError, map } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { FileUploaderModel } from '../models/common/file-uploader.model';
import { Router } from '@angular/router';
import { SpinnerService } from '../../spinner/spinner.service';
declare const process: any;

/**
 * This is a helper class that will help you  to send HttpClient Requests
 */
@Injectable({
    providedIn: 'root'
  })
export class ServiceHelper {
    public accessToken!: string;
    public fetchStart = new EventEmitter<any>();
    public fetchEnd = new EventEmitter<any>();
    constructor(protected _http: HttpClient,private router: Router,private spinnerService: SpinnerService) { }

    public api(): IRequestBuilder {
        // (window as any).apiHost
        //http://192.168.1.9:8000/
        return new RequestBuilder(this._http, "http://192.168.1.9:8000/", new UserTokenProvider(this), this.fetchStart, this.fetchEnd,this.router,this,this.spinnerService);
    }
}

export interface IRequestBuilder {
    url(url: string): IRequestBuilder;
    header(name: string, value: string): IRequestBuilder;
    noAuth(): IRequestBuilder;
    noToken(): IRequestBuilder;
    needJson(): IRequestBuilder;
    needUrlencode(): IRequestBuilder;
    hasJson(): IRequestBuilder;
    hasUrlencoded(): IRequestBuilder;
    rowData(data: any): IRequestBuilder;
    json(data: any): IRequestBuilder;
    get<T, E>(next: NextCallback<T>, error: ErrorCallback<E>, queyParameters?: string):void;
    getPDF<T, E>(next: NextCallback<T>, error: ErrorCallback<E>, queyParameters?: string):void;
    post<T, E>(next: NextCallback<T>, error: ErrorCallback<E>):void;
    put<T, E>(next: NextCallback<T>, error: ErrorCallback<E>):void;
    patch<T, E>(next: NextCallback<T>, error: ErrorCallback<E>):void;
    delete<T, E>(next: NextCallback<T>, error: ErrorCallback<E>):void;
    getObserve<T>(queyParameters?: string): Observable<T>;
    sendFile(payload: Array<FileUploaderModel>, timenow: any, progress: any): Observable<any>;
}
interface AuthTokenProvider {
    getTokenInfo(): { name: string, value: string } | null;
}

export type NextCallback<T> = (value: T) => void;
export type ErrorCallback<T> = (value: T) => void;

class UserTokenProvider implements AuthTokenProvider {
    private _serviceHelper: ServiceHelper;
    constructor(serviceHelper: ServiceHelper) { this._serviceHelper = serviceHelper; }
    getTokenInfo(): { name: string, value: string }| null {
        return this._serviceHelper.accessToken ? { name: 'Authorization', value: `Bearer ${this._serviceHelper.accessToken}` } : null;
    }
}

export class RequestBuilder implements IRequestBuilder {
    private _request: { url: string, headers: Array<{ name: string, value: string }>,
        authorize: boolean,token_need: boolean, data: string
    } = { url: '', headers: [], authorize: true,token_need:true, data: '' };
    private _http: HttpClient;
    private _baseUrl: string;
    private _tokenProvider: AuthTokenProvider;
    private _startEvent: EventEmitter<any>;
    private _endEvent: EventEmitter<any>;
    private spinnerService: SpinnerService; // Add SpinnerService


    constructor(http: HttpClient, baseUrl: string, tokenProvider: AuthTokenProvider, start: EventEmitter<any>, end: EventEmitter<any>, private router: Router,private service_helper:ServiceHelper, spinnerService: SpinnerService) {
        this._http = http;
        this._baseUrl = baseUrl;
        this._tokenProvider = tokenProvider;
        this._startEvent = start;
        this._endEvent = end;
        this._request.authorize = true;
        this._request.token_need = true;
        this.spinnerService = spinnerService; // Assign SpinnerService
        
    }

    private getRequestOptions(): any {
        const r = this._request;

        var headers = new HttpHeaders()

        if (r.authorize) {
            const tokenInfo = this._tokenProvider.getTokenInfo();
            if (tokenInfo) {
                headers = headers.set(tokenInfo.name, tokenInfo.value);
            }
        }
        if (r.headers && r.headers.length) {
            r.headers.forEach(header => {
                headers = headers.set(header.name, header.value);
            });
        }
        return headers;
    }

    url(url: string): IRequestBuilder {
        this._request.url = url;
        return this;
    }

    rowData(data: any): IRequestBuilder {
        this._request.data = data;
        return this;
    }

    json(data: any): IRequestBuilder {
        this._request.data = JSON.stringify(data);
        return this.hasJson();
    }

    header(name: string, value: string): IRequestBuilder {
        this._request.headers.push({ name, value });
        return this;
    }

    noAuth(): IRequestBuilder {
        this._request.authorize = false;
        return this;
    }
    noToken(): IRequestBuilder {
        this._request.token_need = false;
        return this;
    }

    needJson(): IRequestBuilder {
        this._request.headers.push({ name: 'Accept', value: 'application/json' });
        return this;
    }

    needUrlencode(): IRequestBuilder {
        this._request.headers.push({ name: 'Accept', value: 'application/x-www-form-urlencoded' });
        return this;
    }

    hasJson(): IRequestBuilder {
        this._request.headers.push({ name: 'Content-Type', value: 'application/json' });
        return this;
    }

    hasUrlencoded(): IRequestBuilder {
        this._request.headers.push({ name: 'Content-Type', value: 'application/x-www-form-urlencoded' });
        return this;
    }


    post<T, E>(next: NextCallback<T>, error: ErrorCallback<E>) {
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

        const requestOptions = {
            headers: new Headers(headerDict),
        };
        this.spinnerService.show(); //show spinner when the request starts
        this._startEvent.emit();
        const subscription = this._http.post(this._baseUrl + this._request.url, this._request.data, { headers: this.getRequestOptions() })
            .subscribe({
                next:(response) => { 
                    this.spinnerService.hide();
                    this.next(next, response); 
                    this._endEvent.emit();
                 },
                error: (e) => {
                    this.spinnerService.hide(); // Hide spinner on error
                    if(e.status==401 && this._request.token_need){
                            this.router.navigate(['/login']);
                    }else{
                        subscription.unsubscribe(); this._endEvent.emit(); error(e);
                    }

                     }
            });
    }


    put<T, E>(next: NextCallback<T>, error: ErrorCallback<E>) {
        this.spinnerService.show();
        this._startEvent.emit();
        const subscription = this._http.put(this._baseUrl + this._request.url, this._request.data, { headers: this.getRequestOptions() })
            .subscribe({
                next: (response) => {
                    this.spinnerService.hide();
                    this.next(next, response); this._endEvent.emit(); },
                error: (e) => {
                    this.spinnerService.hide();
                    if(e.status==401 && this._request.token_need){

                            this.router.navigate(['/login']);

                    }else{
                     subscription.unsubscribe(); this._endEvent.emit(); error(e); }
                    }
            });
    }

    patch<T, E>(next: NextCallback<T>, error: ErrorCallback<E>) {
        this.spinnerService.show();
        this._startEvent.emit();
        const subscription = this._http.patch(this._baseUrl + this._request.url, this._request.data, { headers: this.getRequestOptions() })
            .subscribe({
                next: (response) => {
                    this.spinnerService.hide(); 
                    this.next(next, response); this._endEvent.emit(); },
                error: (e) => {
                    this.spinnerService.hide();
                    if(e.status==401 && this._request.token_need){

                            this.router.navigate(['/login']);

                    }else{
                    subscription.unsubscribe(); this._endEvent.emit(); error(e); }
                }
                });
    }

    delete<T, E>(next: NextCallback<T>, error: ErrorCallback<E>) {
        this.spinnerService.show();
        this._startEvent.emit();
        const subscription = this._http.delete(this._baseUrl + this._request.url, { headers: this.getRequestOptions() })
            .subscribe({
                next: (response) => {
                    this.spinnerService.hide();
                    this.next(next, response); this._endEvent.emit(); },
                error: (e) => {
                    this.spinnerService.hide();
                    if(e.status==401 && this._request.token_need){
                            this.router.navigate(['/login']);

                    }else{
                     subscription.unsubscribe(); this._endEvent.emit(); error(e); }}
            });
    }

    get<T, E>(next: NextCallback<T>, error: ErrorCallback<E>, queyParameters = '') {
        this.spinnerService.show();
        this._startEvent.emit();
        var para=(queyParameters)?('?' + queyParameters):"";
        const subscription = this._http.get(this._baseUrl + this._request.url + para, { headers: this.getRequestOptions() })
            .subscribe({
                
                next: (response) => {
                    this.spinnerService.hide();
                    this.next(next, response); this._endEvent.emit(); },
                error: (e) => {
                    this.spinnerService.hide();
                    if(e.status==401 && this._request.token_need){
                            this.router.navigate(['/login']);

                    }else{

                     subscription.unsubscribe(); this._endEvent.emit(); error(e);}
                     }
            });
    }


    getObserve<T>(queyParameters = ''): Observable<T> {
        this._startEvent.emit();
        return this._http.get(this._baseUrl + this._request.url + '?' + queyParameters, { headers: this.getRequestOptions() }).pipe(
            map(r => this.next(null, r)));
    }


    getPDF<T, E>(next: NextCallback<T>, error: ErrorCallback<E>, queyParameters = '') {
        this._startEvent.emit();
        var para=(queyParameters)?('?' + queyParameters):"";
        const subscription = this._http.get(this._baseUrl + this._request.url + para, { headers: this.getRequestOptions(), responseType: 'blob' as 'json'  })
            .subscribe({
                next: (response) => { this.next(next, response); this._endEvent.emit(); },
                error: (e) => {
                    if(e.status==401 && this._request.token_need){
                            this.router.navigate(['/login']);

                    }else{

                     subscription.unsubscribe(); this._endEvent.emit(); error(e);}
                     }
            });
    }




    sendFile(payload: Array<FileUploaderModel>, timenow: any, progress: any): Observable<any> {
        const url = this._baseUrl + this._request.url;
       return new Observable(observer => {
            const formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < payload.length; i++) {
                formData.append(payload[i]._name, payload[i].payload, payload[i].payload.name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        localStorage.setItem('imageUrl', xhr.response);
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                progress(Math.round(event.loaded / event.total * 100));
            };
            xhr.open('POST', url, true);

            if (this._request.authorize) {
                const tokenInfo = this._tokenProvider.getTokenInfo();
                if (tokenInfo) {
                    xhr.setRequestHeader(tokenInfo.name, tokenInfo.value);
                }
            }
            const serverFileName = xhr.send(formData);
        })
    }

    private next(n:any, data:any): any {
        try {
            const d = data;
            if (n) {
                n(d);
            }
            return d;
        } catch (e) {
            if (n) {
                n({});
            }
            return {};
        }
    }
}
