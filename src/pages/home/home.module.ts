import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SharedModule } from '../../app/shared.module';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(HomePage),
    IonicImageLoader,
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}