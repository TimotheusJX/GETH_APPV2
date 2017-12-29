import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OnDemandItem } from '../../shared/onDemandItemDesc';
/**
 * Generated class for the OndemandyouthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ondemandyouth',
  templateUrl: 'ondemandyouth.html',
})
export class OndemandyouthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OndemandyouthPage');
  }

}
