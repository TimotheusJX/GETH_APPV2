import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrayerlistPage } from './prayerlist';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    PrayerlistPage,
  ],
  imports: [
    IonicPageModule.forChild(PrayerlistPage),
    PdfViewerModule
  ],
  exports: [
    PrayerlistPage,   
  ]
})
export class PrayerlistPageModule {}
