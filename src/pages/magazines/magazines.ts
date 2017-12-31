import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Magazines } from '../shared/magazines';
import { Observable } from 'rxjs/Observable';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-magazines',
  templateUrl: 'magazines.html',
})

export class MagazinesPage {
  magazines: Magazines[];
  errMess: string;
  storageDirectory: any;

  constructor(
    private file: File,
    private transfer: FileTransfer,
    public platform: Platform, 
    public navCtrl: NavController, 
    private restangular: Restangular, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    private document: DocumentViewer) {
    this.getMagazines().subscribe((data) => {
      console.log("magazines: " + data);
      this.magazines = data;
    }, errmess => {this.magazines = null; this.errMess = <any>errmess});

    // assign storage directory
    this.platform.ready().then(() => {
      if(this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if(this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
    });
  }

  getMagazines(): Observable<Magazines[]> {
    return this.restangular.all('magazines').getList();
  }

  itemTapped(event, item) {
    let url = item.url;
    let bookTitle = item.title; 
    const options: DocumentViewerOptions = {
      title: bookTitle
    }
    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
        // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, bookTitle + ".pdf").then((data) => {
          if(data == true) {  // exist
            //open pdf file
            this.document.viewDocument(this.storageDirectory + bookTitle + ".pdf", 'application/pdf', options);


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
            const fileTransfer: FileTransferObject = this.transfer.create();
            fileTransfer.download(url, this.storageDirectory + bookTitle + ".pdf").then((entry) => {
              console.log('download complete' + entry.toURL());
              loading.dismiss();
              //open pdf file
              this.document.viewDocument(this.storageDirectory + bookTitle + ".pdf", 'application/pdf', options);

              //insert info into db



            }).catch(err_2 => {
              console.log("Download error!");
              loading.dismiss();
              console.log(err_2);
            });
          }
        });
      });
    });
  }
}
