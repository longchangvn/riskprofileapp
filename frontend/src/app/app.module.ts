import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SidebarModule } from 'ng-sidebar';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { SharedModule } from './shared/shared.module';
import { AppConsts } from './shared/app-const';
import { SystemConfiguration } from './shared/model/system-config';
import { environment } from 'environments/environment';
import { AlertModule, BsDropdownModule, TypeaheadModule } from 'ngx-bootstrap';
import { System_Configure } from './shared/service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getRemoteServiceSystemConfiguration(): SystemConfiguration {
  return AppConsts.systemConfiguration;
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(AppRoutes, {
      preloadingStrategy: PreloadAllModules//, enableTracing: true
    }),
    FormsModule,
    HttpClientModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    // NgbModule.forRoot(),
    SidebarModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    Title,
   
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: System_Configure, useFactory: getRemoteServiceSystemConfiguration },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Optional() @Inject(System_Configure) config?: SystemConfiguration) {

    
  }
}
