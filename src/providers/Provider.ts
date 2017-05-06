
import { RequestOptions, Headers, Http } from "@angular/http";

export class Provider {
    private _options: RequestOptions;
    private _domain: string;
    constructor(private _http: Http)
    {
        this._domain = "http://46.101.247.89:8080";
        this._options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    }

    public getDomain(){ return this._domain; }
}
