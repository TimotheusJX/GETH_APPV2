import { COMPONENTS, DIRECTIVES } from './app.imports';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    COMPONENTS,
    DIRECTIVES
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    COMPONENTS,
    DIRECTIVES
  ]
})

export class SharedModule { }