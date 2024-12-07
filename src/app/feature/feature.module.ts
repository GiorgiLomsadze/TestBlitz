import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';
import localeKa from '@angular/common/locales/ka';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { ShareModule as ShareButtonsModule, ShareButtonsConfig, SharerMethod } from 'ngx-sharebuttons';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../shared/shared.module';

import { ProductComponent } from './product/product.component';
import { CardComponent } from './product/components/card/card.component';
import { ErrorComponent } from './error/error.component';
import { CompanyComponent } from './company/company.component';
import { DocumentComponent } from './document/document.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsSingleComponent } from './news-single/news-single.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactComponent } from './auth/contact/contact.component';
import { OrderComponent } from './order/order.component';
import { OffersComponent } from './profile/offers/offers.component';
import { PackagesComponent } from './profile/packages/packages.component';
import { OptionsComponent } from './profile/options/options.component';
import { CabinetComponent } from './profile/cabinet/cabinet.component';
import { PackageComponent } from './profile/components/package/package.component';
import { AdsComponent } from './profile/components/ads/ads.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import {ContractsComponent} from './contracts/contracts.component';

// Trim pipe
import { TrimPipe } from '../trim.pipe';

registerLocaleData(localeKa, 'ka');

const shareButtonsConfig: ShareButtonsConfig = {
  sharerMethod: SharerMethod.Window,
  gaTracking: true,
  // windowWidth?: number;
  // windowHeight?: number;
};

@NgModule({
  declarations: [
    ProductComponent,
    CardComponent,
    ErrorComponent,
    CompanyComponent,
    DocumentComponent,
    NewsListComponent,
    NewsSingleComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    OrderComponent,
    OffersComponent,
    PackagesComponent,
    OptionsComponent,
    CabinetComponent,
    PackageComponent,
    AdsComponent,
    AboutComponent,
    HomeComponent,
    MenuComponent,
    ContractsComponent,
    TrimPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgxCleaveDirectiveModule,
    NgScrollbarModule,
    ClickOutsideModule,
    ShareButtonsModule.withConfig(shareButtonsConfig),

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ka' }
  ]
})
export class FeatureModule { }
