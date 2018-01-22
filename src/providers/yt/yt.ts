import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class YtProvider {
  apiKey = 'AIzaSyBVgux1S0xpIqEF6vRkelVdchW8kO1lp2M';
 
  constructor(public http: Http) { }
 
  getPlaylistsForChannel(channel) {
    //GET https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UClVkY596eV54qWAv3VCiMrQ&maxResults=43&key={YOUR_API_KEY}
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=' + channel + '&maxResults=50&key=' + this.apiKey)
    .map((res) => {
      return res.json();
    })
  }

  getNextPagePlaylistsForChannel(channel, pageToken) {
    //GET https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UClVkY596eV54qWAv3VCiMrQ&maxResults=23&pageToken=CBcQAA&key={YOUR_API_KEY}
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=' + channel + '&maxResults=50&pageToken=' + pageToken + '&key=' + this.apiKey)
    .map((res) => {
      return res.json();
    })
  }
 
  getListVideos(listId) {
    //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=PLjoNGmbKf90Lv2SQDuEgTnPSGxe_DFinV&key={YOUR_API_KEY}
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=' + listId + '&key=' + this.apiKey)
    //return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
    .map((res) => {
      return res.json();
    })
  }
  //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=CA8QAA&playlistId=PLjoNGmbKf90Lv2SQDuEgTnPSGxe_DFinV&key={YOUR_API_KEY}
  getNextListVideos(listId, videoPageToken) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=' + videoPageToken + '&playlistId=' + listId + '&key=' + this.apiKey)
    .map((res) => {
      return res.json();
    })
  }
}