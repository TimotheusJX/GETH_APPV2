import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { HTTP } from '@ionic-native/http';
import { Network } from '@ionic-native/network';

@Injectable()
export class LoadHomeImagesProvider {
    storageDirectory: any;
    constructor(    
        private file: File,
        private fileOpener: FileOpener,
        public platform: Platform,
        private http: HTTP,
        public loadingCtrl: LoadingController,
        private network: Network
    ){}

    prepareImages(){
        // assign storage directory and set image items
        this.platform.ready().then(() => {
            if (this.network.type !== 'unknown' && this.network.type !== 'none') {
                console.log("start download images...");
                if(this.platform.is('ios')) {
                    this.storageDirectory = this.file.dataDirectory;
                } else if(this.platform.is('android')) {
                    this.storageDirectory = this.file.externalDataDirectory;
                }
                let homeImages = [
                    {
                        imageUrl: 'http://gethsemanebpc.com/app/01_Feature.jpg',
                        imageTitle: '01_Feature.jpg'
                    },
                    {
                        imageUrl: 'http://gethsemanebpc.com/app/02_Feature.jpg',
                        imageTitle: '02_Feature.jpg'
                    },
                    {
                        imageUrl: 'http://gethsemanebpc.com/app/03_Feature.jpg',
                        imageTitle: '03_Feature.jpg'
                    },
                    {
                        imageUrl: 'http://gethsemanebpc.com/app/04_Feature.jpg',
                        imageTitle: '04_Feature.jpg'
                    },
                    {
                        imageUrl: 'http://gethsemanebpc.com/app/05_Feature.jpg',
                        imageTitle: '05_Feature.jpg'
                    }
                ];

                for(let item of homeImages ) {
                    this.startProcess(item);
                }
            }
        });
    }

    startProcess(item){
        this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
            console.log("I am here 1");
            this.file.checkFile(resolvedDirectory.nativeURL, item.imageTitle).then((data) => {
                console.log("I am here 2");
                if(data == true) {  // exist
                    //delete image file, then download new copy
                    this.file.removeFile(resolvedDirectory.nativeURL, item.imageTitle).then((entry) => {
                        this.http.downloadFile(
                            item.imageUrl, 
                            {}, 
                            {}, 
                            resolvedDirectory.nativeURL + item.imageTitle
                        ).then((response) => {
                            console.log("image downloaded to: " + resolvedDirectory.nativeURL + item.imageTitle);
                        });
                    });
                }else {
                    console.log("not found!");
                    throw {code: 1, message: "NOT_FOUND_ERR"};
                }
            }).catch(err => {
                if(err.code == 1) {
                  this.http.downloadFile(
                    item.imageUrl,
                    {}, 
                    {}, 
                    resolvedDirectory.nativeURL + item.imageTitle
                  ).then((response) => {
                    console.log("image downloaded to: " + resolvedDirectory.nativeURL + item.imageTitle);
                  }).catch(error => {
                    this.doAlert();
                  });
                }
            });
        });
    }

    doAlert() {
        let alert = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Failed to load an image, Please refresh and try again.',
            duration: 500
        });
        alert.present();
    }
}
