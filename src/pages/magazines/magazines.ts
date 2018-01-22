import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, ItemSliding } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Magazines } from '../shared/magazines';
import { Observable } from 'rxjs/Observable';
import { ViewmagazinePage } from '../magazines/viewmagazine/viewmagazine';
import { File } from '@ionic-native/file';
import { FavoriteProvider } from '../shared/monitoringStorage';
import { FormControl } from '@angular/forms';

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

  constructor(
    public navCtrl: NavController, 
    private restangular: Restangular, 
    public navParams: NavParams,
    private file: File,
    public platform: Platform,
    public favoriteProvider: FavoriteProvider,
    public loadingCtrl: LoadingController) {
    this.searchControl = new FormControl();
    // assign storage directory
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
    //prepare magazine data
    this.getMagazines().subscribe((data) => {
      console.log("magazines: " + data);
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
      this.magazines = data;
      this.currentMag = data;
    }, errmess => {this.magazines = null; this.currentMag = null; this.errMess = <any>errmess});
  }

  getMagazines(): Observable<Magazines[]> {
    return this.restangular.all('magazines').getList();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ViewmagazinePage, item);
  }

  removeDownloadedItem(event, item, slidingItem:ItemSliding){
    let bookTitle: string = item.title;
    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
        // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, bookTitle + ".pdf").then((data) => {
          if(data == true) {  // exist
            let loading = this.loadingCtrl.create({
              content: 'Removing the PDF...'
            });
            loading.present();
            //delete pdf file
            this.file.removeFile(resolvedDirectory.nativeURL, bookTitle + '.pdf').then((entry) => {
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
  //  this.prepareData();
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
}
