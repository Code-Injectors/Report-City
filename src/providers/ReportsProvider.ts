import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Provider } from "./Provider";
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';

@Injectable()
export class ReportsProvider extends Provider {
 
  constructor(private http: Http, private storage: Storage) {
      super(http, storage);
  }
 
  getReports(): Promise<Observable<any>> {
      return this.get(this.getDomain() + "/reports").then(data => {
          return data.map(res => res);
      });
  }

  review(data: any): Promise<Observable<any>> {
      return this.post(this.getDomain() + "/reviews", data).then(data => {
          return data.map(res => res);
      });
  }
}