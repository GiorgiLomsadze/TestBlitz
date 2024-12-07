import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './feature/product/product.component';
import { ErrorComponent } from './feature/error/error.component';
import { CompanyComponent } from './feature/company/company.component';
import { DocumentComponent } from './feature/document/document.component';
import { NewsListComponent } from './feature/news-list/news-list.component';
import { NewsSingleComponent } from './feature/news-single/news-single.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { ContactComponent } from './feature/auth/contact/contact.component';
import { OrderComponent } from './feature/order/order.component';
import { AboutComponent } from './feature/about/about.component';
import { HomeComponent } from './feature/home/home.component';

import { CabinetComponent } from './feature/profile/cabinet/cabinet.component';
import { OffersComponent } from './feature/profile/offers/offers.component';
import { PackagesComponent } from './feature/profile/packages/packages.component';
import { OptionsComponent } from './feature/profile/options/options.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { MenuComponent } from './feature/menu/menu.component';
import { ContractsComponent } from './feature/contracts/contracts.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'how', component: AboutComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'product/contracts', component: ContractsComponent },
  { path: 'product/:category', component: ProductComponent },
  { path: 'product/:category/:slug', component: ProductComponent },
  { path: 'document/:slug', component: DocumentComponent },

  { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsSingleComponent },
  { path: 'offer', component: NewsListComponent },
  { path: 'offer/:id', component: NewsSingleComponent },

  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  { path: 'recover', component: RegisterComponent },
  { path: 'register', canActivate: [AuthGuard], component: RegisterComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'order/:slug/:id', component: OrderComponent },

  {
    path: 'profile',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'cabinet', component: CabinetComponent },
      { path: 'offers', component: OffersComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'options', component: OptionsComponent },
    ],
  },

  { path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
