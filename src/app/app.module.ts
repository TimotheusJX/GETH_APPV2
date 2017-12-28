import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { DevotionsPage } from '../pages/devotions/devotions';
import { ExhortationsPage } from '../pages/exhortations/exhortations';
import { MagazinesPage } from '../pages/magazines/magazines';
import { RadioPage } from '../pages/radio/radio';
import { AudioPage } from '../pages/ondemand/audio/audio';
import { OndemandPage } from '../pages/ondemand/ondemand';
import { VideoPage } from '../pages/video/video';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from '../pages/shared/restConfig';

import { SharedModule } from './shared.module';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { Media, MediaObject } from '@ionic-native/media';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    DevotionsPage,
    ExhortationsPage,
    MagazinesPage,
    RadioPage,
    AudioPage,
    OndemandPage,
    VideoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RestangularModule.forRoot(RestangularConfigFactory),
    SharedModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    DevotionsPage,
    ExhortationsPage,
    MagazinesPage,
    RadioPage,
    AudioPage,
    OndemandPage,
    VideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    FileTransfer,
    FileTransferObject,
    Media,
  ]
})
export class AppModule {}
