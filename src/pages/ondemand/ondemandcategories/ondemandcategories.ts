import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { OnDemandItem } from '../../shared/onDemandItemDesc';
import { Observable } from 'rxjs/Observable';
import { AudioPage } from '../audio/audio';
/**
 * Generated class for the OndemandcategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ondemandcategories',
  templateUrl: 'ondemandcategories.html',
})
export class OndemandcategoriesPage {
  onDemandItems: OnDemandItem[];
  errMess: string;
  page: string;
  onDemandCategoryTitle: string;

  constructor(public navCtrl: NavController, private restangular: Restangular, public navParams: NavParams, public modalCtrl: ModalController) {
    this.page = navParams.get('page');
    this.onDemandCategoryTitle = navParams.get('title');
    this.getItems(this.page).subscribe((data) => {
      console.log(data);
      this.onDemandItems = data;
    }, errmess => {this.onDemandItems = null; this.errMess = <any>errmess});
  }

  getItems(page): Observable<OnDemandItem[]> {
    if(page === "OndemandmenPage"){
      return this.restangular.all('OnDemand_men').getList();
    }else if(page === "OndemandwomenPage"){
      return this.restangular.all('OnDemand_women').getList();
    }else if(page === "OndemandyouthPage"){
      return this.restangular.all('OnDemand_youth').getList();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OndemandcategoriesPage');
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
 