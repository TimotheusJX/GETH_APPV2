import { YtProvider } from './../../providers/yt/yt';
import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
//import { ReversePipe } from '../../pipes/reverse/reverse';
 
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  channelId = 'UClVkY596eV54qWAv3VCiMrQ'; // Gethsemane Channel ID
  playlists: any[] = [];//initialize first, virtual scroll requires to be created right at the start, if evaulated to false at the start, nothing will be generated
  playlistsSize: number;
  nextPageTokenString: string;
  hasNextPageTokenString: boolean = false;
  errorMessage: string;
  tempPlaylists: any[];

  constructor(public navCtrl: NavController, private ytProvider: YtProvider, private alertCtrl: AlertController) { 
    this.searchPlaylists();
  }
 
  searchPlaylists() {
    this.ytProvider.getPlaylistsForChannel(this.channelId).subscribe((data) => {
      console.log('tempPlaylists: ', data);
      this.tempPlaylists = data.items;
      this.playlistsSize = data.pageInfo.totalResults;
      console.log("playlist size : " + this.playlistsSize);
      if(data.hasOwnProperty('nextPageToken')){
        console.log("here 000 ");
        this.nextPageTokenString = data.nextPageToken;
        this.hasNextPageTokenString = true;
      }
      if(this.hasNextPageTokenString){
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
    this.ytProvider.getNextPagePlaylistsForChannel(this.channelId, this.nextPageTokenString).subscribe((data) => {
      if(data.hasOwnProperty('nextPageToken')){
        this.nextPageTokenString = data.nextPageToken;
        this.getNextPagePlaylists();
        console.log("here 222");
      }else{
        this.hasNextPageTokenString = false;
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
    this.navCtrl.push('PlaylistPage', {id: id});
  }

}
