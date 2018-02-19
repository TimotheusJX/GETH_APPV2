import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Prayerlist } from '../shared/prayerlist';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the PrayerlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-prayerlist',
  templateUrl: 'prayerlist.html',
})
export class PrayerlistPage {
  prayerlist: Prayerlist;
  pdfSrc: string;
  errMess: string;

  constructor(
    public navCtrl: NavController, 
    private restangular: Restangular, 
    public navParams: NavParams) {
      this.getPrayerList().subscribe((data) => {
        console.log("prayerlist: ");
        console.log(data);
        this.prayerlist = data;
      }, errmess => {this.prayerlist = null; this.errMess = <any>errmess});
  }

  getPrayerList(): Observable<Prayerlist> {
    return this.restangular.one('prayerlist').get();
  }

}
 