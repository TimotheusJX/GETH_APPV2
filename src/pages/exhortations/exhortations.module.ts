import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhortationsPage } from './exhortations';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ExhortationsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ExhortationsPage),
  ],
  exports: [
    ExhortationsPage
  ]
})
export class ExhortationsPageModule {}