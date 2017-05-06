
import { RequestOptions, Headers, Http } from "@angular/http";

export class Provider {
    private _options: RequestOptions;
    constructor(private _http: Http)
    {
        this._options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    }

}
