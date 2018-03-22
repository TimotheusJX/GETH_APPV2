import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { ImageLoaderConfig } from 'ionic-image-loader';

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
    private imageLoaderConfig: ImageLoaderConfig
  ) {
    this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setConcurrency(5);
    this.imageLoaderConfig.setMaximumCacheAge(1 * 24 * 60 * 60 * 1000); //1 day
  }

  //retrieve jsonList
  ionViewWillEnter(){
    this.getJsonList();
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("featuredItems: ");
      console.log(data.featuredItems);
      this.slides = data.featuredItems;
    })
  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log("Slide changed! Current index is", currentIndex);
  }


}
