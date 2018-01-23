import { YtProvider } from '../../../providers/yt/yt';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  videosInPlaylist: any[] = [];//initialize so that virtual scroll is trigger at the start to prepare the resources
  currentVideosInPlaylist: any[];
  tempVideosInPlaylist: any[];
  listId: any;
  videoListSize: number;
  nextPageTokenString: string;
  errorMessage: string;
  searchControl: FormControl;
  searchTerm: string = '';
  searching: any = false;
  errMess: string;
  apiKey:string;
 
  constructor(private navParams: NavParams, 
    private ytProvider: YtProvider, 
    private youtube: YoutubeVideoPlayer, 
    private plt: Platform,
    private alertCtrl: AlertController
  ){
    this.searchControl = new FormControl();
    this.listId = this.navParams.get('id');
    this.ytProvider.getCredentials().subscribe((data) => {
      this.apiKey = data.apiKey;
      this.searchPlaylistVideos();
    }, errmess => {this.errMess = <any>errmess});
  }

  searchPlaylistVideos(){
    this.ytProvider.getListVideos(this.listId, this.apiKey).subscribe(data => {
      this.tempVideosInPlaylist = data.items;
      this.videoListSize = data.pageInfo.totalResults;
      if(data.hasOwnProperty('nextPageToken')){
        this.nextPageTokenString = data.nextPageToken;
        this.getNextPageVideos();
      }else{
        this.videosInPlaylist = this.tempVideosInPlaylist;
        this.currentVideosInPlaylist = this.tempVideosInPlaylist;
      }
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No videos found.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  //retrieve second page of videos
  getNextPageVideos(){
    console.log("here 111 ");
    this.ytProvider.getNextListVideos(this.listId, this.nextPageTokenString, this.apiKey).subscribe((data) => {
      console.log('videos2222: ', data);
      if(data.hasOwnProperty('nextPageToken')){
        this.nextPageTokenString = data.nextPageToken;
        this.getNextPageVideos();
        console.log("here 222");
      }
      for(let i=0; i<data.items.length; i++) {
        this.tempVideosInPlaylist.push(data.items[i]);
      }
      if(this.tempVideosInPlaylist.length === this.videoListSize){
        this.videosInPlaylist = this.tempVideosInPlaylist;
        this.currentVideosInPlaylist = this.tempVideosInPlaylist;
        console.log("more itemssss: ");
        console.log(this.videosInPlaylist);
      }
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Videos Found',
        buttons: ['OK']
      });
      alert.present();
    });
  }
 
  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }


  ionViewWillEnter(){
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.videosInPlaylist = this.currentVideosInPlaylist;
      this.searchItems();
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  searchItems() {
    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.videosInPlaylist = this.currentVideosInPlaylist.filter((item) => {
        return item.snippet.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });  
    }
  }
}