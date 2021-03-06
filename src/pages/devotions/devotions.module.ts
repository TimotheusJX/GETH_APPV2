import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevotionsPage } from './devotions';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    DevotionsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(DevotionsPage),
  ],
  exports: [
    DevotionsPage
  ]
})
export class DevotionsPageModule {}
