import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class YtProvider {
  errMess: string;

  constructor(public http: Http, private restangular: Restangular) { 
  }

  prepareCredentials(){
    console.log("Init credentials for video.....");
    this.getCredentials().subscribe((data) => {
      return data;
    }, errmess => {this.errMess = <any>errmess});
  }

  getCredentials(){
    return this.restangular.one('videoCredential').get();
  }
 
  getPlaylistsForChannel(channelId, apiKey) {
    //GET https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId={CHANNEL_ID}&maxResults=43&key={YOUR_API_KEY}
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=' + channelId + '&maxResults=50&key=' + apiKey)
    .map((res) => {
      return res.json();
    })
  }

  getNextPagePlaylistsForChannel(channelId, apiKey, pageToken) {
    //GET https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId={CHANNEL_ID}&maxResults=23&pageToken=CBcQAA&key={YOUR_API_KEY}
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=' + channelId + '&maxResults=50&pageToken=' + pageToken + '&key=' + apiKey)
    .map((res) => {
      return res.json();
    })
  }
 
  getListVideos(listId, apiKey) {
    //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=PLjoNGmbKf90Lv2SQDuEgTnPSGxe_DFinV&key={YOUR_API_KEY}
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=' + listId + '&key=' + apiKey)
    //return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
    .map((res) => {
      return res.json();
    })
  }
  //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=CA8QAA&playlistId=PLjoNGmbKf90Lv2SQDuEgTnPSGxe_DFinV&key={YOUR_API_KEY}
  getNextListVideos(listId, videoPageToken, apiKey) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=' + videoPageToken + '&playlistId=' + listId + '&key=' + apiKey)
    .map((res) => {
      return res.json();
    })
  }
}