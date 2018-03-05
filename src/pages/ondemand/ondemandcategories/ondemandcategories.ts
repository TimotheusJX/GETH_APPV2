import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ModalController, LoadingController, ItemSliding } from 'ionic-angular';
import { OnDemandItem } from '../../shared/onDemandItemDesc';
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
  currentODItems: OnDemandItem[];
  errMess: string;
  page: string;
  storageDirectory: any;
  onDemandCategoryTitle: string;
  storageKey: string;
  activeItemSliding: ItemSliding = null;
  searchControl: FormControl;
  searchTerm: string = '';
  searching: any = false;
  jsonStorageKey: string = 'appJsonList';
  onDemandGrpData: any;

  constructor(
    public navCtrl: NavController,
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
    }else if(key === 'sundaysermon'){
      this.storageKey = "sundaysermon";
    }
    //assign directory
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if(this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
    });
    //this.prepareData();
  }
  
  prepareData(){
    this.getJsonList().then((data) => {
      if(this.page === "OndemandmenPage"){
        this.onDemandGrpData = data.OnDemand_men;
      }else if(this.page === "OndemandwomenPage"){
        this.onDemandGrpData = data.OnDemand_women;
      }else if(this.page === "OndemandyouthPage"){
        this.onDemandGrpData = data.OnDemand_youth;
      }else if(this.page === "SundaySermonPage"){
        this.onDemandGrpData = data.OnDemand_sundaysermon;
      }
      //set isFavorite to true if item already downloaded, else set false
      this.favoriteProvider.getAllFavoriteItems(this.storageKey).then(result => {
        if (result) {
          for(let item of this.onDemandGrpData){
            if(result.indexOf(item.title) != -1){
              item.isFavorite = true;
            }else{
              item.isFavorite = false;
            }
          }
        }
      })
      this.onDemandItems = this.onDemandGrpData;
      this.currentODItems = this.onDemandGrpData;
    }, errmess => {this.onDemandItems = null; this.currentODItems = null; this.errMess = <any>errmess});
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OndemandcategoriesPage');
  }

  itemTapped(event, item) {
    this.navCtrl.push(AudioPage, item);
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
      this.onDemandItems = this.currentODItems;
      this.searchItems();
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  searchItems() {
    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.onDemandItems = this.currentODItems.filter((item) => {
        return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });  
    }
  }
}
 