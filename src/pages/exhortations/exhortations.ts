import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Exhortations } from '../shared/exhortationsDesc';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { RefresherProvider } from '../shared/dragToRefresh';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({})
@Component({
  selector: 'page-exhortations',
  templateUrl: 'exhortations.html',
})
export class ExhortationsPage {
  jsonStorageKey: string = 'appJsonList';
  exhortations: Exhortations[] = [];
  errMess: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public favoriteProvider: FavoriteProvider,
    public loadingCtrl: LoadingController,
    public refreshProvider: RefresherProvider,
    private screenOrientation: ScreenOrientation
  ){}

  //retrieve jsonList
  ionViewWillEnter(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getJsonList();
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("exhortations: ");
      console.log(data);
      this.exhortations = data.exhortations;
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
            content: 'Success!',
            duration: 500
        });
        loading2.present();
        this.exhortations = data.exhortations;
        console.log("updated successsssss ");
        console.log(this.exhortations);
      });
    }, errmess => {loading.dismiss(); refresher.complete(); this.refreshProvider.doAlert(); this.errMess = <any>errmess;})

  }
}

