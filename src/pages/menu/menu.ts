import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DevotionsPage } from '../devotions/devotions';
import { ExhortationsPage } from '../exhortations/exhortations';
import { MagazinesPage } from '../magazines/magazines';
import { RadioPage } from '../radio/radio';
import { OndemandPage } from '../ondemand/ondemand';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: Component;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(pageName: String){
    if(pageName == "devotions"){
      this.navCtrl.push(DevotionsPage);
    }else if(pageName == "exhortations"){
      this.navCtrl.push(ExhortationsPage);
    }else if(pageName == "radio"){
      this.navCtrl.push(RadioPage);
    }else if(pageName == "ondemand"){
      this.navCtrl.push(OndemandPage);
    }else if(pageName == "magazines"){
      this.navCtrl.push(MagazinesPage);
    }
  }

}
