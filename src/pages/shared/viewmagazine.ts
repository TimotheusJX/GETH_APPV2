import { Injectable } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FavoriteProvider } from './monitoringStorage';
import { HTTP } from '@ionic-native/http';
import { DocumentViewer } from '@ionic-native/document-viewer';

@Injectable()
export class ViewPdfProvider {
  url: string;
  bookTitle: string;
  savedBookTitle: string;
  storageDirectory: any;
  pdfSrc: string;
  storageKey: string;
  isFavorite: boolean;

  constructor(    
    private file: File,
    private fileOpener: FileOpener,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public favoriteProvider: FavoriteProvider,
    private http: HTTP,
    private alertCtrl: AlertController,
    private document: DocumentViewer
  ) {}

  preparePdf(item){
    this.url = item.url;
    this.bookTitle = item.title;
    this.savedBookTitle = this.bookTitle.replace(/[^0-9a-z]/gi, '');
    this.isFavorite = item.isFavorite;
    this.storageKey = item.key;
    // assign storage directory
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if(this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
    });

    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
        // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, this.savedBookTitle + ".pdf").then((data) => {
          if(data == true) {  // exist
            this.document.viewDocument(this.storageDirectory + this.savedBookTitle + '.pdf', 'application/pdf', {
              documentView: { closeLabel: 'Back' },
              navigationView: { closeLabel: 'Navigation' },
              email: { enabled: true },
              openWith: { enabled: true },
              bookmarks: { enabled: true },
              search: { enabled: true }
            });
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
              resolvedDirectory.nativeURL + this.savedBookTitle + ".pdf"
            ).then((response) => {
                loading.dismiss();
                //insert info into db as downloaded/favourite content
                this.favoriteProvider.favoriteItem(this.storageKey, this.bookTitle).then(() => {
                  this.isFavorite = true;
                });
                this.document.viewDocument(resolvedDirectory.nativeURL + this.savedBookTitle + ".pdf", 'application/pdf', {
                  documentView: { closeLabel: 'Back' },
                  navigationView: { closeLabel: 'Navigation' },
                  email: { enabled: true },
                  openWith: { enabled: true },
                  bookmarks: { enabled: true },
                  search: { enabled: true }
                });
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
}
