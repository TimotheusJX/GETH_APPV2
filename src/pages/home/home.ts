import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Platform, normalizeURL } from 'ionic-angular';
import { LoadHomeImagesProvider } from '../shared/loadHomeImages';
import { File } from '@ionic-native/file';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  storageDirectory: any;
  feature01: any; 
  feature02: any;
  feature03: any; 
  feature04: any;
  feature05: any;

  constructor(
    private file: File,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public loadHomeImagesProvider: LoadHomeImagesProvider,
    public platform: Platform
  ) {
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
          this.storageDirectory = this.file.dataDirectory;
      } else if(this.platform.is('android')) {
          this.storageDirectory = this.file.externalDataDirectory;
      }

      this.feature01 = normalizeURL(this.storageDirectory + '01_Feature.jpg');
      this.feature02 = normalizeURL(this.storageDirectory + '02_Feature.jpg');
      this.feature03 = normalizeURL(this.storageDirectory + '03_Feature.jpg');
      this.feature04 = normalizeURL(this.storageDirectory + '04_Feature.jpg');
      this.feature05 = normalizeURL(this.storageDirectory + '05_Feature.jpg');

    });
  }

  doRefresh(refresher){
    let loading = this.loadingCtrl.create({
      content: 'Updating Content...'
    });
    loading.present();

    this.loadHomeImagesProvider.prepareImages();

    let time_in_ms = 2000
    let hideRefresherTimeout = setTimeout( () => {
      refresher.complete();
      loading.dismiss();
      let loading2 = this.loadingCtrl.create({
        spinner: 'hide',
        content: 'Complete!',
        duration: 500
      });
      loading2.present();
    }, time_in_ms); 
  }

  errorHandler(event, itemUrl) {
    setTimeout(() => {
      event.target.src = itemUrl;
    }, 1000);
  }


}
 