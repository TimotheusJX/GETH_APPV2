import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { FavoriteProvider } from '../../shared/monitoringStorage';

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
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    public platform: Platform, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public favoriteProvider: FavoriteProvider) {
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
            window.requestFileSystem(this.storageDirectory, 0, function (fs) {
              console.log('file system open: ' + fs.name);
              fs.root.getFile(this.bookTitle, { create: true, exclusive: false }, function (fileEntry) {
                console.log('fileEntry is file? ' + fileEntry.isFile.toString());
                let oReq: any = new XMLHttpRequest();
                // Make sure you add the domain name to the Content-Security-Policy <meta> element.
                oReq.open("GET", this.url, true);
                // Define how you want the XHR data to come back
                oReq.responseType = "blob";
                oReq.onload = function (oEvent) {
                  let blob: any = oReq.response; // Note: not oReq.responseText
                  if (blob) {
                    // Create a URL based on the blob
                    let url: any = window.URL.createObjectURL(blob);
                    loading.dismiss();
                    //open pdf file
                    this.pdfSrc = url;
                    //insert info into db as downloaded/favourite content
                    this.favoriteProvider.favoriteItem(this.storageKey, this.bookTitle).then(() => {
                      this.isFavorite = true;
                    });
                  } else console.error('we didnt get an XHR response!');
                };
                oReq.send(null);
              }, function (err) {loading.dismiss(); console.error('error getting file! ' + err); });
            }, function (err) { console.error('error getting persistent fs! ' + err); });
          

/*
            //filetransfer start
            const fileTransfer: FileTransferObject = this.transfer.create();
            fileTransfer.download(this.url, this.storageDirectory + this.bookTitle + '.pdf').then((entry) => {
              console.log('download complete' + entry.toURL());
              loading.dismiss();
              //open pdf file
              this.pdfSrc = this.storageDirectory + this.bookTitle + '.pdf';

              //insert info into db as downloaded/favourite content
              this.favoriteProvider.favoriteItem(this.storageKey, this.bookTitle).then(() => {
                this.isFavorite = true;
              });

            }).catch(err_2 => {
              console.log("Download error!");
              loading.dismiss();
              console.log(err_2);
            });
*/


          }
        });
      });
    });
  }

  share(){
    this.fileOpener.open(this.pdfSrc, 'application/pdf')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error openening file', e));
  }
  //to replace file transfer
  /*downloadandreadFile(loading){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      console.log('file system open: ' + fs.name);
      fs.root.getFile(this.bookTitle, { create: true, exclusive: false }, function (fileEntry) {
        console.log('fileEntry is file? ' + fileEntry.isFile.toString());
        let oReq: any = new XMLHttpRequest();
        // Make sure you add the domain name to the Content-Security-Policy <meta> element.
        oReq.open("GET", this.url, true);
        // Define how you want the XHR data to come back
        oReq.responseType = "blob";
        oReq.onload = function (oEvent) {
          let blob: any = oReq.response; // Note: not oReq.responseText
          if (blob) {
            // Create a URL based on the blob
            let url: any = window.URL.createObjectURL(blob);
            loading.dismiss();
            //open pdf file
            this.pdfSrc = url;
            //insert info into db as downloaded/favourite content
            this.favoriteProvider.favoriteItem(this.storageKey, this.bookTitle).then(() => {
              this.isFavorite = true;
            });
          } else console.error('we didnt get an XHR response!');
        };
        oReq.send(null);
      }, function (err) {loading.dismiss(); console.error('error getting file! ' + err); });
    }, function (err) { console.error('error getting persistent fs! ' + err); });
  }*/
}
