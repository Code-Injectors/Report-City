import { Observable } from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from "@angular/http";
import { Storage } from '@ionic/storage';

export class Provider {
    private _headers: Headers;
    private _options: RequestOptions;
    private _domain: string;
    constructor(private _http: Http, private _storage: Storage)
    {
        this._domain = "http://46.101.247.89:8080";
        //this._domain = "http://10.42.0.94:8080";
        this.getOptions();
    }

    public getDomain(){ return this._domain; }
    
    public getOptions() {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
        this._options = new RequestOptions({ headers: this._headers});
    }

    public getToken(): Promise<any> { 
           return this._storage.get("token");
    }

    public setToken(value: string): void { 
        this._storage.ready().then(() => {
           this._storage.set("token", value);
        });
    }

    get(url: string, options=this._options) : Promise <Observable<any>>{
        return this.getToken().then(data => {
            this.getOptions();
            options.headers.append("Authorization", data);
            return this._http.get(url, options).map(res => {
                return res.json();
            });
        });
        
    }

    post(url: string, body, options=this._options) : Promise<Observable<any>>{
         return this.getToken().then(data => {
            this.getOptions();
            options.headers.append("Authorization", data);
            return this._http.post(url, body, options).map(res => res.json());
        });
    }
}
