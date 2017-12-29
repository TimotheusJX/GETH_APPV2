import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { OnDemandItem } from '../../shared/onDemandItemDesc';
import { Observable } from 'rxjs/Observable';
import { AudioPage } from '../audio/audio';
/**
 * Generated class for the OndemandmenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ondemandmen',
  templateUrl: 'ondemandmen.html',
})
export class OndemandmenPage {
  onDemandItems: OnDemandItem[];
  errMess: string;

  constructor(public navCtrl: NavController, private restangular: Restangular, public navParams: NavParams, public modalCtrl: ModalController) {
    this.getItems().subscribe((data) => {
      console.log(data);
      this.onDemandItems = data;
    }, errmess => {this.onDemandItems = null; this.errMess = <any>errmess});
  }

  getItems(): Observable<OnDemandItem[]> {
    return this.restangular.all('OnDemand_men').getList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OndemandmenPage');
  }

  itemTapped(event, item) {
    this.openModal(item);
  }

  openModal(item) {
    console.log("this is items" + item);
    this.modalCtrl.create(AudioPage, item, { cssClass: 'inset-modal' })
                  .present();
  }
}
