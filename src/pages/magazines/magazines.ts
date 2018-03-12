import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController, ItemSliding } from 'ionic-angular';
import { Magazines } from '../shared/magazines';
import { ViewmagazinePage } from '../magazines/viewmagazine/viewmagazine';
import { File } from '@ionic-native/file';
import { FavoriteProvider } from '../shared/monitoringStorage';
import { FormControl } from '@angular/forms';
import { RefresherProvider } from '../shared/dragToRefresh';

@IonicPage({})
@Component({
  selector: 'page-magazines',
  templateUrl: 'magazines.html',
})

export class MagazinesPage {
  magazines: Magazines[];
  currentMag: Magazines[];
  fixMag: Magazines[];
  errMess: string;
  storageDirectory: any;
  storageKey: string = 'magazines';
  activeItemSliding: ItemSliding = null;
  searchControl: FormControl;
  searchTerm: string = '';
  searching: any = false;
  jsonStorageKey: string = 'appJsonList';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    public platform: Platform,
    public favoriteProvider: FavoriteProvider,
    public loadingCtrl: LoadingController,
    public refreshProvider: RefresherProvider) {
    this.searchControl = new FormControl();
    // assign storage directory
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
    //prepare magazine data
    this.getJsonList().then((data) =>{
      console.log("magazines: " + data.magazines);
      //set isFavorite to true if item already downloaded, else set false
      this.favoriteProvider.getAllFavoriteItems(this.storageKey).then(result => {
        if (result) {
          console.log("value of result: ");
          console.log(result);
          for(let item of data.magazines){
            if(result.indexOf(item.title) != -1){
              item.isFavorite = true;
            }else{
              item.isFavorite = false;
            }
          }
        }
      })
      this.magazines = data.magazines;
      this.currentMag = data.magazines;
    }, errmess => {this.magazines = null; this.currentMag = null; this.errMess = <any>errmess});
  }

  getJsonList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey);
  }

  itemTapped(event, item) {
    this.navCtrl.push(ViewmagazinePage, item);
  }

  removeDownloadedItem(event, item, slidingItem:ItemSliding){
    let bookTitle: string = item.title;
    let savedBookTitle: string = item.title.replace(/[^0-9a-z]/gi, '');
    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
        // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, savedBookTitle + ".pdf").then((data) => {
          if(data == true) {  // exist
            let loading = this.loadingCtrl.create({
              content: 'Removing the PDF...'
            });
            loading.present();
            //delete pdf file
            this.file.removeFile(resolvedDirectory.nativeURL, savedBookTitle + '.pdf').then((entry) => {
              //remove info from db as downloaded/favourite content
              this.favoriteProvider.unfavoriteItem(this.storageKey, bookTitle).then(() => {
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
      this.magazines = this.currentMag;
      this.searchItems();
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  searchItems() {
    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.magazines = this.currentMag.filter((item) => {
        return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });  
    }
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
            content: 'Success!',
            duration: 500
        });
        loading2.present();
        //set isFavorite to true if item already downloaded, else set false
        this.favoriteProvider.getAllFavoriteItems(this.storageKey).then(result => {
          if (result) {
            console.log("value of result: ");
            console.log(result);
            for(let item of data.magazines){
              if(result.indexOf(item.title) != -1){
                item.isFavorite = true;
              }else{
                item.isFavorite = false;
              }
            }
          }
        })
        this.magazines = data.magazines;
        this.currentMag = data.magazines;
        console.log("updated successsssss ");
        console.log(this.magazines);
      });
    }, errmess => {this.magazines = null; this.currentMag = null; loading.dismiss(); refresher.complete(); this.refreshProvider.doAlert(); this.errMess = <any>errmess;})
  }
}
