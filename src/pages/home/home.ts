import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { FeaturedItems } from '../shared/featuredItems';
import { Banners } from '../shared/banners';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slider') slider: Slides;

  items: FeaturedItems[];
  errMess: string;    

  constructor(public navCtrl: NavController, private restangular: Restangular) {
    this.getFeaturedItems().subscribe((data) => {
      console.log(data);
      this.items = data;
    }, errmess => {this.items = null; this.errMess = <any>errmess});
  }

  getFeaturedItems(): Observable<FeaturedItems[]> {
    return this.restangular.all('featuredItems').getList();
  }

  currentIndex = 0;

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.currentIndex);
  }
  

}
