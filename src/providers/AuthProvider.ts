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
 
  login(email: string, password: string) : Observable<Response> {
     return this.http.post(this.getDomain() + '/auth',{username: email, password: password}, this.getOptions()).map(res => res.json());
  }
}