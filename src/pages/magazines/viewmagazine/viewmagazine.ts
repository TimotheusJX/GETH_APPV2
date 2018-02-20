import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { FavoriteProvider } from '../../shared/monitoringStorage';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the ViewmagazinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewmagazine',
  templateUrl: 'viewmagazine.html',
})
export class ViewmagazinePage {
  url: string;
  bookTitle: string;
  storageDirectory: any;
  pdfSrc: string;
  storageKey: string;
  isFavorite: boolean;

  constructor(    
    private file: File,
    private fileOpener: FileOpener,
    public platform: Platform, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public favoriteProvider: FavoriteProvider,
    private http: HTTP,
    private alertCtrl: AlertController
  ) {
    this.url = navParams.get('url');
    this.bookTitle = navParams.get('title');
    this.isFavorite = navParams.get('isFavorite');
    let key = navParams.get('key');
    //determine the storageKey to use
    if(key === 'magazines'){
      this.storageKey = "magazines";
    }else if(key === 'prayerlists'){
      this.storageKey = "prayerlists";
    }
    //console.log("here: " + this.url);
    // assign storage directory
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if(this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
    });
  }

  ionViewWillEnter(){
    // comment out the following line when adjusting UI in browsers
    this.preparePdf();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewmagazinePage');
  }

  preparePdf(){
    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
        // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, this.bookTitle + ".pdf").then((data) => {
          if(data == true) {  // exist
            //open pdf file
            this.pdfSrc = this.storageDirectory + this.bookTitle + '.pdf';

          } else {  // not sure if File plugin will return false. go to download
            console.log("not found!");
            throw {code: 1, message: "NOT_FOUND_ERR"};
          }
        }).catch(err => {
          console.log("Error occurred while checking local files:");
          console.log(err);
          if(err.code == 1) {
            // not found! download!
            console.log("not found! download!");
            let loading = this.loadingCtrl.create({
              content: 'Downloading the PDF...'
            });
            loading.present();
            //download and read file starts
            console.log("resolved directory 2: " + resolvedDirectory.nativeURL);
            this.http.downloadFile(
              this.url, 
              {}, 
              {}, 
              resolvedDirectory.nativeURL + this.bookTitle + ".pdf"
            ).then((response) => {
                // prints the filename
                console.log(response.status);
                // prints the error
                console.log("response error: " + response.error);
                loading.dismiss();
                //insert info into db as downloaded/favourite content
                this.favoriteProvider.favoriteItem(this.storageKey, this.bookTitle).then(() => {
                  this.isFavorite = true;
                });
                this.pdfSrc = resolvedDirectory.nativeURL + this.bookTitle + ".pdf";
            }).catch(error => {
              console.log("Download error! " + error.status);
              loading.dismiss();
              console.log(error.error);
              this.doAlert();
            });
          }
        });
      });
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

  share(){
    this.fileOpener.open(this.pdfSrc, 'application/pdf')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error openening file', e));
  }
}
