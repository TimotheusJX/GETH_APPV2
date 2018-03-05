import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AboutUsDesc } from '../shared/aboutusDesc';
import { PopupfabmodalPage } from './popupfabmodal/popupfabmodal';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { RefresherProvider } from '../shared/dragToRefresh';
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
  jsonStorageKey: string = 'appJsonList';
  aboutUs: AboutUsDesc;
  expanded: any;
  contracted: any;
  showIcon = true;
  preload  = true;
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController, 
    public favoriteProvider: FavoriteProvider,
    public refreshProvider: RefresherProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

  ionViewWillEnter(){
    this.getJsonList();
  }
  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("aboutus: ");
      console.log(data.aboutus);
      this.aboutUs = data.aboutus;
    })
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

  doRefresh(refresher){
    let loading = this.loadingCtrl.create({
      content: 'Updating Content...'
    });
    loading.present();
    this.refreshProvider.prepareJsonList().subscribe((data) => {
      this.favoriteProvider.favoriteAndOverwritePreviousItem(this.jsonStorageKey, data).then(() => {
        loading.dismiss();
        refresher.complete();
        let loading2 = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Success!',
            duration: 500
        });
        loading2.present();
        this.aboutUs = data.aboutUs;
      });
    }, errmess => {loading.dismiss(); refresher.complete(); this.refreshProvider.doAlert(); this.errMess = <any>errmess;})

  }
 
}
