import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Slides } from 'ionic-angular';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { Devotions } from '../shared/devotionsDesc';
import { RefresherProvider } from '../shared/dragToRefresh';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({})
@Component({
  selector: 'page-devotions',
  templateUrl: 'devotions.html',
})
export class DevotionsPage {
  @ViewChild('slider') slider: Slides;

  jsonStorageKey: string = 'appJsonList';
  devotions: Devotions[] = [];
  errMess: string;
  loadContent: any; 
  fontSize: number;
  fontSizeStorageKey: string = 'devotionAndExhortationFontSize';
  pullToRefreshStateKey: string = 'devotionExhortPullToRefreshState';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public favoriteProvider: FavoriteProvider,
    public refreshProvider: RefresherProvider,
    public loadingCtrl: LoadingController,
    private screenOrientation: ScreenOrientation
  ) {
    this.loadContent = this.loadingCtrl.create({
      content: 'loading...'
    });
    this.favoriteProvider.getAllFavoriteItems(this.fontSizeStorageKey).then(result => {
      if (result) {
        this.fontSize = result;
      }else{
        this.fontSize = 1.7;
      }
    });
  }

  ionViewWillEnter(){
    this.screenOrientation.unlock();
    this.loadContent.present();
    this.getJsonList();
  }

  ionViewDidEnter(){
    this.loadContent.dismiss();
  }

  ionViewWillLeave(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("devotions: ");
      console.log(data);
      this.devotions = data.devotions;
    })
  }

  doRefresh(refresher){
    let loading = this.loadingCtrl.create({
      content: 'Updating Content...'
    });
    loading.present();
    this.refreshProvider.prepareJsonList().subscribe((data) => {
      this.favoriteProvider.favoriteAndOverwritePreviousItem(this.jsonStorageKey, data).then(() => {
        loading.dismiss();
        refresher.complete();
        let loading2 = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Complete!',
            duration: 500
        });
        loading2.present();
        this.devotions = data.devotions;
        console.log("updated successsssss ");
        console.log(this.devotions);
      });
    }, errmess => {loading.dismiss(); refresher.complete(); this.refreshProvider.doAlert(); this.errMess = <any>errmess;})
  }

  ngAfterViewInit() {
    this.slider.autoHeight = true;
  }

  clickMainFAB() {
    this.favoriteProvider.getAllFavoriteItems(this.pullToRefreshStateKey).then(result => {  
      if(!result){
        let loading3 = this.loadingCtrl.create({
          spinner: 'hide',
          content: 'Please pull to refresh to enable any change in font size.',
          duration: 3000
        });
        loading3.present();
        this.favoriteProvider.favoriteAndOverwritePreviousItem(this.pullToRefreshStateKey, "true");
      }
    });
  }

  increaseFontSize() {
    this.fontSize = this.fontSize * 1.1;
    this.favoriteProvider.favoriteAndOverwritePreviousItem(this.fontSizeStorageKey, this.fontSize);
  }

  decreaseFontSize() {
    this.fontSize = this.fontSize * 0.9;
    this.favoriteProvider.favoriteAndOverwritePreviousItem(this.fontSizeStorageKey, this.fontSize);
  }
}
