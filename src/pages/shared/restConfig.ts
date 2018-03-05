import { baseURL } from './baseurl';
//import { radioURL } from './baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
//import { InjectionToken } from '@angular/core';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl(baseURL);
  RestangularProvider.setRequestSuffix('.json');
}

//Restangular service that call Radio
/*export const RESTANGULAR_RADIO = new InjectionToken<any>('RestangularRadio');
export function RestangularRadioFactory(restangular: Restangular) {
  return restangular.withConfig((RestangularConfigurer) => {
     RestangularConfigurer.setBaseUrl(radioURL);
     RestangularConfigurer.setRequestSuffix('.json');
   });
}*/
