import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OndemandPage } from './ondemand';

@NgModule({
  declarations: [
    OndemandPage,
  ],
  imports: [
    IonicPageModule.forChild(OndemandPage),
  ],
})
export class OndemandPageModule {}
