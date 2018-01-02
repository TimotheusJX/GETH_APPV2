import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ModalController, LoadingController, ItemSliding } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { OnDemandItem } from '../../shared/onDemandItemDesc';
import { Observable } from 'rxjs/Observable';
import { AudioPage } from '../audio/audio';
import { File } from '@ionic-native/file';
import { FavoriteProvider } from '../../shared/monitoringStorage';
import { FormControl } from '@angular/forms';
/**
 * Generated class for the OndemandcategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ondemandcategories',
  templateUrl: 'ondemandcategories.html',
})
export class OndemandcategoriesPage {
  onDemandItems: OnDemandItem[];
  errMess: string;
  page: string;
  storageDirectory: any;
  onDemandCategoryTitle: string;
  storageKey: string;
  activeItemSliding: ItemSliding = null;
  searchControl: FormControl;
  searchTerm: string = '';
  searching: any = false;

  constructor(
    public navCtrl: NavController, 
    private restangular: Restangular, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public favoriteProvider: FavoriteProvider,
    private file: File,
    public platform: Platform,
    public loadingCtrl: LoadingController) {
    this.searchControl = new FormControl();
    this.page = navParams.get('page');
    this.onDemandCategoryTitle = navParams.get('title');
    let key = navParams.get('key');
    //set the stroageKey to use
    if(key === 'women'){
      this.storageKey = "women";
    }else if(key === 'men'){
      this.storageKey = "men";
    }else if(key === 'youth'){
      this.storageKey = "youth";
    }
    //assign directory
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if(this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
    });
    this.prepareData();
  }
  
  prepareData(){
    this.getItems(this.page).subscribe((data) => {
      console.log(data);
      //set isFavorite to true if item already downloaded, else set false
      this.favoriteProvider.getAllFavoriteItems(this.storageKey).then(result => {
        if (result) {
          for(let item of data){
            if(result.indexOf(item.title) != -1){
              item.isFavorite = true;
            }else{
              item.isFavorite = false;
            }
          }
        }
      })
      this.onDemandItems = data;
    }, errmess => {this.onDemandItems = null; this.errMess = <any>errmess});
  }

  getItems(page): Observable<OnDemandItem[]> {
    if(page === "OndemandmenPage"){
      return this.restangular.all('OnDemand_men').getList();
    }else if(page === "OndemandwomenPage"){
      return this.restangular.all('OnDemand_women').getList();
    }else if(page === "OndemandyouthPage"){
      return this.restangular.all('OnDemand_youth').getList();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OndemandcategoriesPage');
  }

  itemTapped(event, item) {
    this.openModal(item);
  }

  openModal(item) {
    console.log("this is items" + item);
    let modal = this.modalCtrl.create(AudioPage, item, { cssClass: 'inset-modal' });
    modal.onDidDismiss(() => {
      this.prepareData();
    });
    modal.present();
  }

  removeDownloadedItem(event, item, slidingItem:ItemSliding){
    let audioTitle: string = item.title;
    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
        // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, audioTitle + ".mp3").then((data) => {
          if(data == true) {  // exist
            let loading = this.loadingCtrl.create({
              content: 'Removing the recording...'
            });
            loading.present();
            //delete pdf file
            this.file.removeFile(resolvedDirectory.nativeURL, audioTitle + '.mp3').then((entry) => {
              //remove info from db as downloaded/favourite content
              this.favoriteProvider.unfavoriteItem(this.storageKey, audioTitle).then(() => {
                item.isFavorite = false;
                loading.dismiss();
                slidingItem.close();
              });
            }).catch(err_2 => {
              console.log("Download error!");
              loading.dismiss();
              console.log(err_2);
            });  
          } else {  // not sure if File plugin will return false. go to download
            console.log("not found!");
            throw {code: 1, message: "NOT_FOUND_ERR"};
          }
        }).catch(err => {
          console.log("Error occurred while checking local files:");
          console.log(err);
        });
      });
    });
  }

  ionViewWillEnter(){
    this.prepareData();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.getItems(this.page).subscribe((data) => {
        //set isFavorite to true if item already downloaded, else set false
        this.favoriteProvider.getAllFavoriteItems(this.storageKey).then(result => {
          if (result) {
            console.log("value of result: ");
            console.log(result);
            for(let item of data){
              if(result.indexOf(item.title) != -1){
                item.isFavorite = true;
              }else{
                item.isFavorite = false;
              }
            }
          }
        })
        this.onDemandItems = data;
        this.searchItems();
      }, errmess => {this.onDemandItems = null; this.errMess = <any>errmess});
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  searchItems() {
    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.onDemandItems = this.onDemandItems.filter((item) => {
        return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });  
    }
  }
}
 