import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
 
@Injectable()
export class YtProvider {
  errMess: string;
  jsonStorageKey: string = 'appJsonList';

  constructor(
    public http: Http,
    public favoriteProvider: FavoriteProvider
  ){}

  prepareCredentials(){
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey);
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