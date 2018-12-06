/// <reference path="extension.d.ts" />
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConsts } from './app/shared/app-const';

export const environmentLoader = new Promise<any>((resolve, reject) => {
  
    const xmlhttp = new XMLHttpRequest(),
      method = 'GET',
      url = './assets/appconfig.json';
  
    xmlhttp.open(method, url, true);
  
    xmlhttp.onload = function() {
      if (xmlhttp.status === 200) {
        resolve(JSON.parse(xmlhttp.responseText));
      } else {
        resolve({});
      }
    };
  
    xmlhttp.send();
  });

  
  environmentLoader.then(env => {
  if (env.production) {
    enableProdMode();
  }
  AppConsts.systemConfiguration = env;
  
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
});

