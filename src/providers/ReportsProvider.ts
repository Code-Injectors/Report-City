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
 
  getReports(body: string=""): Promise<Observable<any>> {
      return this.get(this.getDomain() + "/reports" + body).then(data => {
          return data.map(res => res);
      });
  }

  review(data: any): Promise<Observable<any>> {
      return this.post(this.getDomain() + "/reviews", data).then(data => {
          return data.map(res => res);
      });
  } 

  createReport(data: any): Promise<Observable<any>> {
      return this.post(this.getDomain() + "/reports", data).then(data => {
          return data.map(res => res);
      });
  }

  getReportCategories(): Promise<Observable<any>> {
      return this.get(this.getDomain() + "/categories").then(data => {
          return data.map(res => res);
      });
  }
}