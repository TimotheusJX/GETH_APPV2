//to enable drag to refresh
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';

 
@Injectable()
export class RefresherProvider {
    jsonStorageKey: string = "appJsonList";
    errMess: string;

    constructor(
        public storage: Storage,
        private restangular: Restangular,
        private alertCtrl: AlertController
    ) {}

    prepareJsonList(): Observable<any> {
        return this.restangular.one('db').one('db').get();
    }

    doAlert() {
        const alert = this.alertCtrl.create({
          title: 'Content failed to update!',
          subTitle: 'This may be due to network issue. Please try again later.',
          buttons: ['Ok']
        });
        alert.present();
    }
}