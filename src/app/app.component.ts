import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
import { FavoriteProvider } from '../pages/shared/monitoringStorage';
import { MenuPage } from '../pages/menu/menu';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Connection } from '@angular/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MenuPage';
  jsonStorageKey: string = "appJsonList";
  errMess: string;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private toast: ToastController, 
    private network: Network,
    private restangular: Restangular,
    public favoriteProvider: FavoriteProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.downloadJsonList();
      //on connect, refresh content
      this.network.onConnect().subscribe((data) => {
        //console.log("trying here");
        console.log(data);
        this.displayOnlineUpdate(data.type);
        this.downloadJsonList();
      });
      //on disconnect, shows warning
      this.network.onDisconnect().subscribe((data) => {
        console.log(data);
        this.displayOfflineUpdate(data.type);
        let loading3 = this.loadingCtrl.create({
          spinner: 'hide',
          content: 'Certain functions may not perform as expected in offline mode :(',
          duration: 3000
        });
        loading3.present();
      }, error => console.error(error));
    });
  }

  prepareJsonList(): Observable<any> {
    return this.restangular.one('db').one('db').get();
  }

  displayOnlineUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: 'You are now online.',
      duration: 2000
    }).present();
  }

  displayOfflineUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: 'You are now offline.',
      duration: 2000
    }).present();
  }

  doAlert() {
    const alert = this.alertCtrl.create({
      title: 'Content failed to update!',
      subTitle: 'This may be due to network issue. Please try again later.',
      buttons: ['Ok']
    });
    alert.present();
  }

  downloadJsonList(){
    let loading = this.loadingCtrl.create({
      content: 'Updating Content...'
    });
    loading.present();

    this.prepareJsonList().subscribe((data) => {
      console.log("initial data: ");
      console.log(data);
      //insert info into db as downloaded/favourite content
      this.favoriteProvider.favoriteAndOverwritePreviousItem(this.jsonStorageKey, data).then(() => {
        console.log("database updated..");
        loading.dismiss();
        let loading2 = this.loadingCtrl.create({
          spinner: 'hide',
          content: 'Complete!',
          duration: 500
        });
        loading2.present();
      });
    }, errmess => {loading.dismiss(); this.doAlert(); this.errMess = <any>errmess});
  }
}
