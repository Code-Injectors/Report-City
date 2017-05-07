
import { RequestOptions, Headers, Http } from "@angular/http";

export class Provider {
    private _headers: Headers;
    private _options: RequestOptions;
    private _domain: string;
    constructor(private _http: Http)
    {
        this._domain = "http://46.101.247.89:8080";
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
        this._options = new RequestOptions({ headers: this._headers});
    }

    public getDomain(){ return this._domain; }
    
    public getOptions() {return this._options}

}
