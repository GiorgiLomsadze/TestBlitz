import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatSelectModule } from '@angular/material/select';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/components/header/header.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';

import { APIService } from './services/api.service';
import { ContentService } from './services/content.service';
import { AuthService } from './services/auth.service';
import { SeoService } from './services/seo.service';
import { AuthGuard } from './guards/auth.guard';

import { ChannelModalComponent } from './components/modals/channel-modal/channel-modal.component';
import { FeedBackComponent } from './components/feed-back/feed-back.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Modules for multi language functionallity
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslationService } from './components/layout/components/header/translation.service';
// import { HeaderComponent } from './components/layout/components/header//header.component';

import { FormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ChannelModalComponent,
    FeedBackComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    ClickOutsideModule,
    MatSelectModule,
    // ---------------|
    FormsModule,
    // ---------------|
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    },)    
  ],
  bootstrap: [HeaderComponent],  
  exports: [
    LayoutComponent,
    FeedBackComponent,
    // ---------------|
    TranslateModule,
    // ---------------|
  ],
  providers: [
    APIService,
    ContentService,
    AuthService,
    SeoService,
    AuthGuard,
    TranslationService,
  ]
})
export class SharedModule { }
