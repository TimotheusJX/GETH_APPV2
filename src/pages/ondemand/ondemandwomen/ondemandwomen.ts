import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OnDemandItem } from '../../shared/onDemandItemDesc';
/**
 * Generated class for the OndemandwomenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ondemandwomen',
  templateUrl: 'ondemandwomen.html',
})
export class OndemandwomenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OndemandwomenPage');
  }

}
