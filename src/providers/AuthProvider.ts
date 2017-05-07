import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Provider } from "./Provider";
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthProvider extends Provider {
 
  constructor(private http: Http, private storage: Storage) {
      super(http, storage);
  }
 
  login(email: string, password: string) : Observable<any> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers});

     return this.http.post(this.getDomain() + '/auth',{username: email, password: password}, options)
     .map(res => res.json());
  }

  register(data: any) : Observable<any> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers});

     return this.http.post(this.getDomain() + '/auth/register',{data}, options)
     .map(res => res.json());
  }
}