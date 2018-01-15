import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

//grab list of videos from gbpc vimeo english sermon channel

  videos: Object = {};
  videoData: String[];
/*
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getVideos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
    this.getVideos();
  }

  getVideos(){
    this.restProvider.getVideos()
      .subscribe(
        videos => this.videos = videos);
        // sthis.videoData = this.videos.data;
        //error => this.errorMessage = <any>error);
  }

   // private apiUrl = 'https://restcountries.eu/rest/v2/all';
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
  }*/
}
