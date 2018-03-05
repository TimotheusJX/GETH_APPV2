import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ChurchInfoDesc } from '../../shared/churchInfoDesc';
import { FlashCardComponent } from '../../../components/flash-card/flash-card';
import { FavoriteProvider } from '../../../pages/shared/monitoringStorage';

/**
 * Generated class for the PopupfabmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public favoriteProvider: FavoriteProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupFabModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  //retrieve jsonList
  ionViewWillEnter(){
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
