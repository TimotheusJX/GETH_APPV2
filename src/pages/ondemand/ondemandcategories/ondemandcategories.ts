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
  category: string;
  onDemandCategoryTitle: string;

  constructor(public navCtrl: NavController, private restangular: Restangular, public navParams: NavParams, public modalCtrl: ModalController) {
    this.category = navParams.get('category');
    this.getItems(this.category).subscribe((data) => {
      console.log(data);
      this.onDemandItems = data;
    }, errmess => {this.onDemandItems = null; this.errMess = <any>errmess});
  }

  getItems(category): Observable<OnDemandItem[]> {
    if(category === "men"){
      this.onDemandCategoryTitle = "Men";
      return this.restangular.all('OnDemand_men').getList();
    }else if(category === "women"){
      this.onDemandCategoryTitle = "Women";
      return this.restangular.all('OnDemand_women').getList();
    }else if(category === "youth"){
      this.onDemandCategoryTitle = "Youth";
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
 