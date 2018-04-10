import { YtProvider } from './../../providers/yt/yt';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PlaylistPage } from './playlist/playlist';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({})
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  playlists: any[] = [];//initialize first, virtual scroll requires to be created right at the start, if evaulated to false at the start, nothing will be generated
  playlistsSize: number;
  nextPageTokenString: string;
  errorMessage: string;
  tempPlaylists: any[];
  errMess: string; 
  apiKey:string;
  channelId: string;
  loadContent: any; 

  constructor(
    public navCtrl: NavController, 
    private ytProvider: YtProvider, 
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    //private screenOrientation: ScreenOrientation
  ) {
    this.loadContent = this.loadingCtrl.create({
      content: 'loading...'
    });
    this.loadContent.present();
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); 
    this.ytProvider.prepareCredentials().then((data) =>{
      this.apiKey = data.videoCredential[0].apiKey;
      this.channelId = data.videoCredential[0].channelId;
      this.searchPlaylists();
    }, errmess => {this.errMess = <any>errmess});
  }

  ionViewDidEnter(){
    this.loadContent.dismiss();
  }
 
  searchPlaylists() {
    this.ytProvider.getPlaylistsForChannel(this.channelId, this.apiKey).subscribe((data) => {
      console.log('tempPlaylists: ', data);
      this.tempPlaylists = data.items;
      this.playlistsSize = data.pageInfo.totalResults;
      console.log("playlist size : " + this.playlistsSize);
      if(data.hasOwnProperty('nextPageToken')){
        console.log("here 000 ");
        this.nextPageTokenString = data.nextPageToken;
        this.getNextPagePlaylists();
      }else{
        this.playlists = this.tempPlaylists;
      }
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists Found',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  getNextPagePlaylists(){
    console.log("here 111 ");
    this.ytProvider.getNextPagePlaylistsForChannel(this.channelId, this.apiKey, this.nextPageTokenString).subscribe((data) => {
      if(data.hasOwnProperty('nextPageToken')){
        this.nextPageTokenString = data.nextPageToken;
        this.getNextPagePlaylists();
        console.log("here 222");
      }
      for(let i=0; i<data.items.length; i++) {
        this.tempPlaylists.push(data.items[i]);
      }
      if(this.tempPlaylists.length === this.playlistsSize){
        this.playlists = this.tempPlaylists;
        console.log("more itemssss: ");
        console.log(this.playlists);
      }
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists Found',
        buttons: ['OK']
      });
      alert.present();
    });
  }
 
  openPlaylist(id) {
    this.navCtrl.push(PlaylistPage, {id: id});
  }

}
 