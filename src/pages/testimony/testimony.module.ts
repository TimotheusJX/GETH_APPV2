import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestimonyPage } from './testimony';

@NgModule({
  declarations: [
    TestimonyPage,
  ],
  imports: [
    IonicPageModule.forChild(TestimonyPage),
  ],
})
export class TestimonyPageModule {}
