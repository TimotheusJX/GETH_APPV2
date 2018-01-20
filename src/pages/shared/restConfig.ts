import { baseURL } from './baseurl';
//import { videoURL } from './baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
//import { InjectionToken } from '@angular/core';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl(baseURL);
}
/*
//Restangular service that uses Vimeo
export const RESTANGULAR_VIDEO = new InjectionToken<any>('RestangularVideo');
export function RestangularVideoFactory(restangular: Restangular) {
  return restangular.withConfig((RestangularConfigurer) => {
     RestangularConfigurer.setBaseUrl(videoURL);
     RestangularConfigurer.setDefaultHeaders({'Authorization': 'Bearer b639f9e8945bde4ca962fec9c4bc7e9b'});
   });
}
*/