import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { FlashCardComponent } from '../../components/flash-card/flash-card';
import { TestimoniesDesc } from '../shared/testimoniesDesc';
/**
 * Generated class for the TestimonyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-testimony',
  templateUrl: 'testimony.html',
})
export class TestimonyPage {
  testimonies: TestimoniesDesc[];
  errMess: string;

  constructor(    
    public navCtrl: NavController, 
    public navParams: NavParams,
    private restangular: Restangular
  ) {
    this.getTestimoniesInfo().subscribe((data) => {
      console.log("testimonies: ");
      console.log(data);
      this.testimonies = data;
    }, errmess => {this.testimonies = null; this.errMess = <any>errmess});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestimonyPage');
  }
  getTestimoniesInfo(): Observable<TestimoniesDesc[]> {
    return this.restangular.all('testimonies').getList();
  }
}
