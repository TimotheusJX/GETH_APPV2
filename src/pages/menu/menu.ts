import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DevotionsPage } from '../devotions/devotions';
import { ExhortationsPage } from '../exhortations/exhortations';
import { MagazinesPage } from '../magazines/magazines';

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
    }else{
      this.navCtrl.push(MagazinesPage);
    }
  }

}
