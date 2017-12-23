import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-radio',
  templateUrl: 'radio.html',
})

export class RadioPage {
  radio: MediaObject;
  filename: any = "Hotel California";
  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

  constructor(private media: Media,  public platform: Platform) {}

  ionViewWillEnter(){
    // comment out the following line when adjusting UI in browsers
    this.prepareAudioFile();
  }

  ionViewWillLeave(){
    this.radio.stop();
    this.radio.release();
  }
  
  prepareAudioFile() {
    let url = "http://biblewitness.com:8000/listen.pls";

    this.platform.ready().then(() => {
      this.radio = this.media.create(url);
/*      this.radio.play();
      this.radio.setVolume(0.0);  // you don't want users to notice that you are playing the file*/
      this.radio.onStatusUpdate.subscribe(status => {
        // 2: playing
        // 3: pause
        // 4: stop
        this.message = status;
        console.log("1111... "+status);
        switch(status) {
          case 1:
            this.is_in_play = false;
            break;
          case 2:   // 2: playing
            this.is_in_play = true;
            this.is_playing = true;
            break;
          case 3:   // 3: pause
            this.is_in_play = true;
            this.is_playing = false;
            break;
          case 4:   // 4: stop
          default:
            this.is_in_play = false;
            this.is_playing = false;
            break;
        }
      })
      console.log("audio file set");
      this.message = "audio file set";
      this.is_ready = true;
    });
  }

  playRadio() {
    this.radio.play();
  }

  pauseRadio() {
    this.radio.pause();
  }

}
