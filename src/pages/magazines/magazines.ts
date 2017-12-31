import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Magazines } from '../shared/magazines';
import { Observable } from 'rxjs/Observable';
import { ViewmagazinePage } from '../magazines/viewmagazine/viewmagazine';

@Component({
  selector: 'page-magazines',
  templateUrl: 'magazines.html',
})

export class MagazinesPage {
  magazines: Magazines[];
  errMess: string;
  storageDirectory: any;

  constructor(
    public navCtrl: NavController, 
    private restangular: Restangular, 
    public navParams: NavParams) {
    this.getMagazines().subscribe((data) => {
      console.log("magazines: " + data);
      this.magazines = data;
    }, errmess => {this.magazines = null; this.errMess = <any>errmess});

  }

  getMagazines(): Observable<Magazines[]> {
    return this.restangular.all('magazines').getList();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ViewmagazinePage, item);
  }
}
