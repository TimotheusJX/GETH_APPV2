import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { Devotions } from '../shared/devotionsDesc';
import { RefresherProvider } from '../shared/dragToRefresh';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({})
@Component({
  selector: 'page-devotions',
  templateUrl: 'devotions.html',
})
export class DevotionsPage {
  jsonStorageKey: string = 'appJsonList';
  devotions: Devotions[] = [];
  errMess: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public favoriteProvider: FavoriteProvider,
    public refreshProvider: RefresherProvider,
    public loadingCtrl: LoadingController,
    //private screenOrientation: ScreenOrientation
  ) {}

  ionViewWillEnter(){
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getJsonList();
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("devotions: ");
      console.log(data);
      this.devotions = data.devotions;
    })
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
        this.devotions = data.devotions;
        console.log("updated successsssss ");
        console.log(this.devotions);
      });
    }, errmess => {loading.dismiss(); refresher.complete(); this.refreshProvider.doAlert(); this.errMess = <any>errmess;})

  }
}
