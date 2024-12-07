import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { APIService } from './shared/services/api.service';
import { loadApp, loadContent } from './shared/services/init.service';
import { ContentService } from './shared/services/content.service';
import { AuthService } from './shared/services/auth.service';

// Modules for multi language functionallity
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslationService } from './shared/components/layout/components/header/translation.service';
import { HeaderComponent } from './shared/components/layout/components/header//header.component';
//import { TrimPipe } from './trim.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    //TrimPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FeatureModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    },)    
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: loadApp, deps: [APIService], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadContent, deps: [ContentService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    TranslationService
  ],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule {

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {
    this.setBodyClass();
    this.auth.setUser();
  }

  private setBodyClass(): void {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        switchMap((e: NavigationEnd) => of(e.url.includes('profile'))),
        tap(e => {
          const bodyClasses = document.querySelector('body').classList;
          e ? bodyClasses.add('profile') : bodyClasses.remove('profile');
        })
      )
      .subscribe();
  }
}
