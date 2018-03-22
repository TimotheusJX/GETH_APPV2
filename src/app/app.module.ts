import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AudioPage } from '../pages/ondemand/audio/audio';
import { OndemandcategoriesPage } from '../pages/ondemand/ondemandcategories/ondemandcategories';
import { FavoriteProvider } from '../pages/shared/monitoringStorage';
import { RefresherProvider } from '../pages/shared/dragToRefresh';
import { PopupfabmodalPage } from '../pages/aboutus/popupfabmodal/popupfabmodal';
import { PopupfabmodalcontactsPage } from '../pages/aboutus/popupfabmodalcontacts/popupfabmodalcontacts';
import { PlaylistPage } from '../pages/video/playlist/playlist';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from '../pages/shared/restConfig';
//import { RestangularConfigFactory, RestangularRadioFactory, RESTANGULAR_RADIO } from '../pages/shared/restConfig';

import { SharedModule } from './shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IonicStorageModule } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ViewPdfProvider } from '../pages/shared/viewmagazine';
import { Media, MediaObject } from '@ionic-native/media';
import { HttpModule } from '@angular/http';
import { YtProvider } from '../providers/yt/yt';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Network } from '@ionic-native/network';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    MyApp,
    AudioPage,
    OndemandcategoriesPage,
    PopupfabmodalPage,
    PopupfabmodalcontactsPage,
    PlaylistPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RestangularModule.forRoot(RestangularConfigFactory),
    SharedModule,
    PdfViewerModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AudioPage,
    OndemandcategoriesPage,
    PopupfabmodalPage,
    PlaylistPage,
    PopupfabmodalcontactsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Media,
    FileOpener,
    FavoriteProvider,
    RefresherProvider,
    HTTP,
    YtProvider,
    YoutubeVideoPlayer,
    //{provide: RESTANGULAR_RADIO, useFactory:  RestangularRadioFactory, deps: [Restangular]},
    BackgroundMode,
    Network,
    DocumentViewer,
    ViewPdfProvider,
    ScreenOrientation,
  ]
})
export class AppModule {}
