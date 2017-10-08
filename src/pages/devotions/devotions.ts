import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Devotions } from '../shared/devotionsDesc';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-devotions',
  templateUrl: 'devotions.html',
})
export class DevotionsPage {

  devotions: Devotions[];
  errMess: string;

  constructor(public navCtrl: NavController, private restangular: Restangular, public navParams: NavParams) {
    this.getDevotions().subscribe((data) => {
      console.log("devotions: " + data);
      this.devotions = data;
    }, errmess => {this.devotions = null; this.errMess = <any>errmess});
  }

  getDevotions(): Observable<Devotions[]> {
    return this.restangular.all('devotions').getList();
  }

}
