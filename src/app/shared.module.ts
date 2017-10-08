import { COMPONENTS } from './app.imports';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    COMPONENTS
  ]
})

export class SharedModule { }