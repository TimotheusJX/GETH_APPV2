import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';
import { OnDemandCat } from '../shared/onDemandDesc';
/**
 * Generated class for the OndemandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ondemand',
  templateUrl: 'ondemand.html',
})
export class OndemandPage {

  onDemandCategories: OnDemandCat[];
  errMess: string;

  constructor(public navCtrl: NavController, private restangular: Restangular, public navParams: NavParams) {
    this.getCategories().subscribe((data) => {
      console.log("onDemandCategories: " + data);
      this.onDemandCategories = data;
    }, errmess => {this.onDemandCategories = null; this.errMess = <any>errmess});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OndemandPage');
  }

  getCategories(): Observable<OnDemandCat[]> {
    return this.restangular.all('OnDemand_categories').getList();
  }

  itemTapped(event, item) {
    this.navCtrl.push(item.page);
  }

}
