import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

/*  private apiUrl = 'https://restcountries.eu/rest/v2/all';  */
  private apiUrl = 'https://api.vimeo.com/channels/gethsemanebpc/videos';
  private auth = 'Bearer b639f9e8945bde4ca962fec9c4bc7e9b';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getVideos(): Observable<string[]> {
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', this.auth);
    return this.http.get(this.apiUrl, {
                      headers: httpHeaders,
                      responseType: 'json'
                    })
                   // .do((this.extractData) => console.log(this.extractData)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
