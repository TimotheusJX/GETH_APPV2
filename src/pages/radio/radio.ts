import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@IonicPage({})
@Component({
  selector: 'page-radio',
  templateUrl: 'radio.html',
})

export class RadioPage {
  radio: MediaObject;
  filename: any = "Testing...";
  isStreaming: boolean = false;

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
    })
  };

  playRadio() {
    this.radio.play();
    this.isStreaming = true;
  }

  pauseRadio() {
    this.radio.pause();
    this.isStreaming = false;
  }

}
