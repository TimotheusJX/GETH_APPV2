import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Prayerlists } from '../shared/prayerlists';
import { Observable } from 'rxjs/Observable';
import { ViewmagazinePage } from '../magazines/viewmagazine/viewmagazine';

/**
 * Generated class for the PrayerlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-prayerlist',
  templateUrl: 'prayerlist.html',
})
export class PrayerlistPage {
  prayerlists: Prayerlists[];
  errMess: string;
  storageDirectory: any;

  constructor(
    public navCtrl: NavController, 
    private restangular: Restangular, 
    public navParams: NavParams) {
    this.getPrayerLists().subscribe((data) => {
      console.log("prayerlists: " + data);
      this.prayerlists = data;
    }, errmess => {this.prayerlists = null; this.errMess = <any>errmess});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrayerlistPage');
  }

  getPrayerLists(): Observable<Prayerlists[]> {
    return this.restangular.all('prayerlists').getList();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ViewmagazinePage, item);
  }

}
 