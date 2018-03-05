import { Component, Inject } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { RadioPlaylist } from '../shared/radioPlaylist';
import { Radiolinks } from '../shared/radiolinks';
import { BackgroundMode } from '@ionic-native/background-mode';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';

@IonicPage({})
@Component({
  selector: 'page-radio',
  templateUrl: 'radio.html'
})

export class RadioPage {
  radio: MediaObject;
  isStreaming: boolean = false;
  radioplaylist: RadioPlaylist;
  radiolinks: Radiolinks;
  private alive: boolean;
  private interval: number;
  errMess: string;
  jsonStorageKey: string = 'appJsonList';

  constructor(
    private media: Media,  
    public backgroundMode : BackgroundMode,
    public platform: Platform,
    public restangular: Restangular, 
    public favoriteProvider: FavoriteProvider
  ) {
    this.alive = true;
    this.interval = 5000;
  }

  ngOnInit() {
    TimerObservable.create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.prepareRadioDetail().subscribe((data) => {
          //first insertion radioplaylist is null, subsequent change only update when current title changes
          console.log("radio items detail: ");
          console.log(data);
          if(this.radioplaylist == null){
            this.radioplaylist = data.radioplaylist;
          }else if(this.radioplaylist != null && this.radioplaylist.current.title != data.radioplaylist.current.title){
            this.radioplaylist = data.radioplaylist;
          }
        }, errmess => {this.radioplaylist = null; this.errMess = <any>errmess});
      });
    this.prepareAudioFile();
  }
  ngOnDestroy(){
    //console.log("destroy");
    this.alive = false; // switches your TimerObservable off
  }

  ionViewWillLeave(){
    this.disableBackgroundMode();
    this.radio.stop();
    this.radio.release();
  }

  prepareAudioFile(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("radioresources: ");
      console.log(data);
      this.radiolinks = data.radioresources;
      this.platform.ready().then(() => {
        this.radio = this.media.create(this.radiolinks.radiolink);
      })
    })
  }

  prepareRadioDetail(): Observable<any> {
    //console.log("start");
    return this.restangular.one('db2').get();
  }

  playRadio() {
    this.enableBackgroundMode();
    this.radio.play();
    this.isStreaming = true;
  }

  pauseRadio() {
    this.disableBackgroundMode();
    this.radio.pause();
    this.isStreaming = false;
  }

  private enableBackgroundMode(): void {
    if(!this.backgroundMode.isEnabled()) {
      console.log("enable background.....");
      this.backgroundMode.enable();
    }
  }

  private disableBackgroundMode(): void {
      if(this.backgroundMode.isEnabled()) {
        console.log("disable background.....");
        this.backgroundMode.disable();
      }
  }
}
