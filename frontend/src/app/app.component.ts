import { Component, OnDestroy } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './services/app-service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  hash: string;
  title: Title;
  constructor(
    public translate: TranslateService,
    private router: Router,
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }
}
