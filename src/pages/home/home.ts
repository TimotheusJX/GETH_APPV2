import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, Slides } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { FeaturedItems } from '../shared/featuredItems';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slider') slider: Slides;

  slideEffect = "coverflow";

  slides: FeaturedItems[];
  errMess: string;    

  constructor(public navCtrl: NavController, private restangular: Restangular, public alertCtrl: AlertController) {
    this.getFeaturedItems().subscribe((data) => {
      console.log(data);
      this.slides = data;
    }, errmess => {this.slides = null; this.errMess = <any>errmess});
  }

  getFeaturedItems(): Observable<FeaturedItems[]> {
    return this.restangular.all('featuredItems').getList();
  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log("Slide changed! Current index is", currentIndex);
  }
}
