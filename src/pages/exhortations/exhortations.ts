import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Exhortations } from '../shared/exhortationsDesc';

import { Observable } from 'rxjs/Observable';

@IonicPage({})
@Component({
  selector: 'page-exhortations',
  templateUrl: 'exhortations.html',
})
export class ExhortationsPage {

  exhortations: Exhortations[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restangular: Restangular) {
    this.getExhortations().subscribe((data) => {
      console.log("exhortations: " + data);
      this.exhortations = data;
    }, errmess => {this.exhortations = null; this.errMess = <any>errmess});    
  }

  getExhortations(): Observable<Exhortations[]> {
    return this.restangular.all('exhortations').getList();
  }

}

