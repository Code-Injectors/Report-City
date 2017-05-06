import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Provider } from "./Provider";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthProvider extends Provider {
 
  constructor(private http: Http) {
      super(http);
  }
 
  load(response?:any, error?:any): Observable<Response> {
     return this.http.get('path/to/data.json').map(res => res.json());
  }
}