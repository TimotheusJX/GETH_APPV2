import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TestimoniesDesc } from '../shared/testimoniesDesc';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { RefresherProvider } from '../shared/dragToRefresh';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({})
@Component({
  selector: 'page-testimony',
  templateUrl: 'testimony.html',
})
export class TestimonyPage {
  jsonStorageKey: string = 'appJsonList';
  testimonies: TestimoniesDesc[] = [];
  errMess: string;

  constructor(    
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public favoriteProvider: FavoriteProvider,
    public refreshProvider: RefresherProvider,
    public loadingCtrl: LoadingController,
    private screenOrientation: ScreenOrientation
  ) {}

  //retrieve jsonList
  ionViewWillEnter(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getJsonList();
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("testimonies: ");
      console.log(data.testimonies);
      this.testimonies = data.testimonies;
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
        this.testimonies = data.testimonies;
        console.log("updated successsssss ");
        console.log(this.testimonies);
      });
    }, errmess => {loading.dismiss(); refresher.complete(); this.refreshProvider.doAlert(); this.errMess = <any>errmess;})

  }
}
