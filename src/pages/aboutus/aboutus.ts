import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AboutUsDesc } from '../shared/aboutusDesc';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { PopupfabmodalPage } from './popupfabmodal/popupfabmodal';
/**
 * Generated class for the AboutusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  aboutUs: AboutUsDesc;
  errMess: string;
  expanded: any;
  contracted: any;
  showIcon = true;
  preload  = true;

  constructor(
    public navCtrl: NavController, 
    private restangular: Restangular, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.getAboutUs().subscribe((data) => {
      //console.log("aboutUs: ");
      //console.log(data[0]);
      this.aboutUs = data;
    }, errmess => {this.aboutUs = null; this.errMess = <any>errmess});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

  getAboutUs(): Observable<AboutUsDesc> {
    return this.restangular.one('aboutus').get();
  }

  expand() {
    this.expanded = true;
    this.contracted = !this.expanded;
    this.showIcon = false;
    setTimeout(() => {
      const modal = this.modalCtrl.create(PopupfabmodalPage);
      modal.onDidDismiss(data => {
        this.expanded = false;
        this.contracted = !this.expanded;
        setTimeout(() => this.showIcon = true, 330);
      });
      modal.present();
    },         200);
  }
 
}
