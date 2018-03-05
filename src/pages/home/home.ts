import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  storageKey: string = "appJsonList";

  @ViewChild('slider') slider: Slides;

  slideEffect = "coverflow";

  errMess: string;    

  constructor(public navCtrl: NavController) {}

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log("Slide changed! Current index is", currentIndex);
  }
}
