import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevotionsPage } from './devotions';

@NgModule({
  declarations: [
    DevotionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DevotionsPage),
  ],
})
export class DevotionsPageModule {}
