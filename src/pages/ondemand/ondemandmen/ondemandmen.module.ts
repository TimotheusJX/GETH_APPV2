import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OndemandmenPage } from './ondemandmen';

@NgModule({
  declarations: [
    OndemandmenPage,
  ],
  imports: [
    IonicPageModule.forChild(OndemandmenPage),
  ],
})
export class OndemandmenPageModule {}
