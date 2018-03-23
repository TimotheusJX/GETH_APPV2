import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, LoadingController } from 'ionic-angular';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { ImageLoaderConfig, ImageLoader } from 'ionic-image-loader';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  jsonStorageKey: string = 'appJsonList';
  slides: any[];

  @ViewChild('slider') slider: Slides;

  errMess: string;    

  constructor(
    public navCtrl: NavController,
    public favoriteProvider: FavoriteProvider,
    private imageLoaderConfig: ImageLoaderConfig,
    private imageLoader: ImageLoader,
    public loadingCtrl: LoadingController,
  ) {
    this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setMaximumCacheAge(1 * 24 * 60 * 60 * 1000); //1 day
    this.imageLoader.preload('http://gethsemanebpc.com/app/01_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/02_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/03_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/04_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/05_Feature.jpg');
  }

  //retrieve jsonList
  ionViewDidEnter(){
  }

  doRefresh(refresher){
    let loading = this.loadingCtrl.create({
      content: 'Updating Content...'
    });
    loading.present();

    this.imageLoader.clearCache();
    this.imageLoader.preload('http://gethsemanebpc.com/app/01_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/02_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/03_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/04_Feature.jpg');
    this.imageLoader.preload('http://gethsemanebpc.com/app/05_Feature.jpg');

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
}
 