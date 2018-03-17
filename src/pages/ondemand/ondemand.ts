import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OnDemandCats } from '../shared/onDemandDesc';
import { OndemandcategoriesPage } from './ondemandcategories/ondemandcategories';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { RefresherProvider } from '../shared/dragToRefresh';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the OndemandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-ondemand',
  templateUrl: 'ondemand.html',
})
export class OndemandPage {
  jsonStorageKey: string = 'appJsonList';
  onDemandCategories: OnDemandCats[] = [];
  errMess: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public favoriteProvider: FavoriteProvider,
    public refreshProvider: RefresherProvider,
    public loadingCtrl: LoadingController,
    //private screenOrientation: ScreenOrientation
  ){}

  //retrieve jsonList
  ionViewWillEnter(){
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getJsonList();
  }
  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("ondemandcats: ");
      console.log(data.ondemandcats);
      this.onDemandCategories = data.ondemandcats;
    })
  }

  itemTapped(event, item) {
  /*  if(item.page === "OndemandmenPage"){
      this.navCtrl.push(OndemandcategoriesPage, item);
    }else if(item.page === "OndemandwomenPage"){
      this.navCtrl.push(OndemandcategoriesPage, item);
    }else if(item.page === "OndemandyouthPage"){
      this.navCtrl.push(OndemandcategoriesPage, item);
    }*/
    this.navCtrl.push(OndemandcategoriesPage, item);
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
            content: 'Complete!',
            duration: 500
        });
        loading2.present();
        this.onDemandCategories = data.ondemandcats;
        console.log("updated successsssss ");
        console.log(this.onDemandCategories);
      });
    }, errmess => {loading.dismiss(); refresher.complete(); this.refreshProvider.doAlert(); this.errMess = <any>errmess;})

  }

}
