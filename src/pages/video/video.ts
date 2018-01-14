import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
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
        this.videoData = this.videos.data;
        //error => this.errorMessage = <any>error);
  }

}
