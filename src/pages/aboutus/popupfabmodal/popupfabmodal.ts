import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ChurchInfoDesc } from '../../shared/churchInfoDesc';
import { FavoriteProvider } from '../../../pages/shared/monitoringStorage';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-popupfabmodal',
  templateUrl: 'popupfabmodal.html',
})
export class PopupfabmodalPage {
  jsonStorageKey: string = 'appJsonList';
  churchInfo: ChurchInfoDesc;
  errMess: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public favoriteProvider: FavoriteProvider,
    //private screenOrientation: ScreenOrientation
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupFabModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  //retrieve jsonList
  ionViewWillEnter(){
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getJsonList();
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("churchInfo: ");
      console.log(data);
      this.churchInfo = data.churchInfo;
    })
  }

}
