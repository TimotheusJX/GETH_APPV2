import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Menuavatar } from '../shared/menuavatar';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

@IonicPage({})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: any;
  menuavatar: Menuavatar;
  errMess: string;
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restangular: Restangular) {
    this.homePage = 'HomePage';
    this.getMenuAvatar().subscribe((data) => {
      console.log(data);
      //to replace url of image src assets/img/avatar/gbpc.png
      this.menuavatar = data;
    }, errmess => {this.menuavatar = null; this.errMess = <any>errmess});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(pageName: String){
    if(pageName === "devotions"){
      this.childNavCtrl.setRoot('DevotionsPage');
    }else if(pageName === "exhortations"){
      this.childNavCtrl.setRoot('ExhortationsPage');
    }else if(pageName === "radio"){
      this.childNavCtrl.setRoot('RadioPage');
    }else if(pageName === "ondemand"){
      this.childNavCtrl.setRoot('OndemandPage');
    }else if(pageName === "magazines"){
      this.childNavCtrl.setRoot('MagazinesPage');
    }else if(pageName === "video"){
      this.childNavCtrl.setRoot('VideoPage');
    }else if(pageName === "prayerlist"){
      this.childNavCtrl.setRoot('PrayerlistPage');
    }else if(pageName === "aboutus"){
      this.childNavCtrl.setRoot('AboutusPage');
    }else if(pageName === "testimonies"){
      this.childNavCtrl.setRoot('TestimonyPage');
    }else if(pageName === "home"){
      this.childNavCtrl.setRoot('HomePage');
    }
  }

  getMenuAvatar(): Observable<Menuavatar> {
    return this.restangular.one('menuavatar').get();
  }

}
