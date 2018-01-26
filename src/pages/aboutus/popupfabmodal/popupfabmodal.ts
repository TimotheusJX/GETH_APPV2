import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ChurchInfoDesc } from '../../shared/churchInfoDesc';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { FlashCardComponent } from '../../../components/flash-card/flash-card';

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
  churchInfo: ChurchInfoDesc;
  errMess: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private restangular: Restangular
  ) {
    this.getChurchInfo().subscribe((data) => {
      console.log("churchInfo: ");
      console.log(data);
      this.churchInfo = data;
    }, errmess => {this.churchInfo = null; this.errMess = <any>errmess});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupFabModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getChurchInfo(): Observable<ChurchInfoDesc> {
    return this.restangular.one('churchInfo').get();
  }

}
