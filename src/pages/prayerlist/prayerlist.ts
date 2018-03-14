import { Component } from '@angular/core';
import { Platform, LoadingController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Prayerlist } from '../shared/prayerlist';
import { FileOpener } from '@ionic-native/file-opener';
import { FavoriteProvider } from '../../pages/shared/monitoringStorage';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({})
@Component({
  selector: 'page-prayerlist',
  templateUrl: 'prayerlist.html',
})
export class PrayerlistPage {
  jsonStorageKey: string = 'appJsonList';
  prayerlist: Prayerlist;
  storageDirectory: any;
  prayerlistFileName: string = "prayerlist";

  constructor(
    private file: File,
    public navCtrl: NavController,
    private fileOpener: FileOpener,
    public navParams: NavParams, 
    public favoriteProvider: FavoriteProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private http: HTTP,
    private document: DocumentViewer,
    private alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation
  ) {}

  //retrieve jsonList
  ionViewWillEnter(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.preparePrayerList();
  }

  preparePrayerList(): any {
    return this.favoriteProvider.getAllFavoriteItems(this.jsonStorageKey).then((data) =>{
      console.log("prayerlists: ");
      console.log(data.prayerlists);
      this.prayerlist = data.prayerlists;
    })
  }

  downloadPrayerlist(e, prayerlistUrl){
    // assign storage directory
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if(this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
      this.triggerDownload(prayerlistUrl);
    });
  }

  triggerDownload(prayerlistUrl){
    let loading = this.loadingCtrl.create({
      content: 'Downloading the PDF...'
    });
    loading.present();
    this.http.downloadFile(
      prayerlistUrl, 
      {}, 
      {}, 
      this.storageDirectory + this.prayerlistFileName + '.pdf'
    ).then((response) => {
        loading.dismiss();
        this.document.viewDocument(this.storageDirectory + this.prayerlistFileName + '.pdf', 'application/pdf', {
          documentView: { closeLabel: 'Back' },
          navigationView: { closeLabel: 'Navigation' },
          email: { enabled: true },
          openWith: { enabled: true },
          bookmarks: { enabled: true },
          search: { enabled: true }
        },()=>{},()=>{
          //onclose
          //delete pdf file
          this.file.removeFile(this.storageDirectory, this.prayerlistFileName + '.pdf').then((entry) => {
           console.log("prayerlist removed successful.....");
          }).catch(err_2 => {
            console.log("error in removing prayerlist!");
            console.log(err_2);
          });  
        });
    }).catch(error => {
      console.log("Download error! " + error.status);
      loading.dismiss();
      console.log(error.error);
      this.doAlert();
    });
  }

  doAlert() {
    const alert = this.alertCtrl.create({
      title: 'Download Failed!',
      subTitle: 'Please try again later or contact administrator for assistance.',
      buttons: ['Ok']
    });
    alert.present();
  }

}
 