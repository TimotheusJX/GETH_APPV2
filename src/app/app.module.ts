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
import { OndemandcategoriesPage } from '../pages/ondemand/ondemandcategories/ondemandcategories';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { PrayerlistPage } from '../pages/prayerlist/prayerlist';
import { ViewmagazinePage } from '../pages/magazines/viewmagazine/viewmagazine';
import { FavoriteProvider } from '../pages/shared/monitoringStorage';
import { PopupfabmodalPage } from '../pages/aboutus/popupfabmodal/popupfabmodal';
import { TestimonyPage } from '../pages/testimony/testimony';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';

import { RestangularModule, Restangular } from 'ngx-restangular';
//import { RestangularConfigFactory, RestangularVideoFactory, RESTANGULAR_VIDEO } from '../pages/shared/restConfig';
import { RestangularConfigFactory } from '../pages/shared/restConfig';
import {  } from '../pages/shared/restConfig';

import { SharedModule } from './shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IonicStorageModule } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { Media, MediaObject } from '@ionic-native/media';
import { HttpModule } from '@angular/http';
import { YtProvider } from '../providers/yt/yt';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
//import { FlashCardComponent } from '../components/flash-card/flash-card';

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
    VideoPage,
    OndemandcategoriesPage,
    AboutusPage,
    PrayerlistPage,
    ViewmagazinePage,
    PopupfabmodalPage,
    TestimonyPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RestangularModule.forRoot(RestangularConfigFactory),
    SharedModule,
    PdfViewerModule,
    IonicStorageModule.forRoot(),
    HttpModule,
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
    VideoPage,
    OndemandcategoriesPage,
    AboutusPage,
    PrayerlistPage,
    ViewmagazinePage,
    PopupfabmodalPage,
    TestimonyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Media,
    FileOpener,
    FavoriteProvider,
    HTTP,
    YtProvider,
    YoutubeVideoPlayer
    //{provide: RESTANGULAR_VIDEO, useFactory:  RestangularVideoFactory, deps: [Restangular]},
  ]
})
export class AppModule {}
