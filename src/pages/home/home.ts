import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  jsonStorageKey: string = 'appJsonList';
  slides: any[];

  @ViewChild('slider') slider: Slides;

  slideEffect = "coverflow";

  errMess: string;    

  constructor(
    public navCtrl: NavController,
    public favoriteProvider: FavoriteProvider,
    private screenOrientation: ScreenOrientation
  ) {}

  //retrieve jsonList
  ionViewWillEnter(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
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
