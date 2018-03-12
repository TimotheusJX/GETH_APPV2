import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Prayerlist } from '../shared/prayerlist';
import { FileOpener } from '@ionic-native/file-opener';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
/**
 * Generated class for the PrayerlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-prayerlist',
  templateUrl: 'prayerlist.html',
})
export class PrayerlistPage {
  jsonStorageKey: string = 'appJsonList';
  prayerlist: Prayerlist;
  pdfSrc: string;

  constructor(
    public navCtrl: NavController,
    private fileOpener: FileOpener,
    public navParams: NavParams, 
    public favoriteProvider: FavoriteProvider
  ) {}

  //retrieve jsonList
  ionViewWillEnter(){
    this.getJsonList();
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("prayerlists: ");
      console.log(data.prayerlists);
      this.prayerlist = data.prayerlists;
    })
  }

}
 