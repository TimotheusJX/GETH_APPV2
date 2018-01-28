import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestimonyPage } from './testimony';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    TestimonyPage,
  ],
  imports: [
    IonicPageModule.forChild(TestimonyPage),
    SharedModule,
  ],
  exports: [
    TestimonyPage,   
  ]
})
export class TestimonyPageModule {}
