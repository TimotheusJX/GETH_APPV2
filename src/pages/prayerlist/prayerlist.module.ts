import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrayerlistPage } from './prayerlist';

@NgModule({
  declarations: [
    PrayerlistPage,
  ],
  imports: [
    IonicPageModule.forChild(PrayerlistPage),
  ],
})
export class PrayerlistPageModule {}
