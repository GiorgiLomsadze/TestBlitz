import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {tap, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {EndPoints} from '../enums/end-points.enum';
import {
  ProductResponse,
  InitResponse,
  CompanyResponse,
  DocumentResponse,
  NewsListResponse,
  NewsSingleResponse,
  Response,
  UserInfoResponse,
  PackageResponse,
  AboutResponse,
  HomeResponse,
  CountriesResponse,
  CitiesResponse,
  IntOptionsResponse,
} from '../interfaces/response.interface';
import {
  RegistrationRequest,
  CallMeRequest,
  GetCodeRequest,
  ChangePasswordRequest,
  OrderRequest,
  GetCitiesRequest,
  ConfirmOrderRequest
} from '../interfaces/request.interface';
import {Init} from '../interfaces/init.interface';
import {Ads, ProductType} from '../interfaces/models.interface';

@Injectable()
export class APIService {

  public initData: Init;
  public isAdsClose = false;

  constructor(
    private http: HttpClient
  ) {
  }

  init(): Observable<InitResponse> {
    return this.http
      .get<InitResponse>(environment.api + EndPoints.Init)
      .pipe(
        take(1),
        tap(res => {
          const phone = res.data.topMenu.find(item => item.id === ProductType.telephone);
          const internet = res.data.topMenu.find(item => item.id === ProductType.internet);

          if (phone && phone.categories) {
            phone.categories.push({
              id: 0,
              name: 'საერთაშორისო ზარები',
              slug: 'calls',
            });
          }

          if (internet) {
            internet.categories.push({
              id: 0,
              name: 'პარამეტრები',
              slug: 'options',
            });
          }

          this.initData = res.data;
        })
      );
  }

  getHome(): Observable<HomeResponse> {
    return this.http
      .get<HomeResponse>(environment.api + EndPoints.Home)
      .pipe(take(1));
  }

  getPage(page: EndPoints): Observable<AboutResponse> {
    return this.http
      .get<AboutResponse>(environment.api + page)
      .pipe(take(1));
  }

  getProducts(category: number): Observable<ProductResponse> {
    const params = new HttpParams().append('category', category.toString());

    return this.http
      .get<ProductResponse>(environment.api + EndPoints.Products, {params})
      .pipe(take(1));
  }

  getCompanyProducts(): Observable<CompanyResponse> {
    return this.http
      .get<CompanyResponse>(environment.api + EndPoints.CompanyProducts)
      .pipe(take(1));
  }

  getDocuments(slug: string, documentNumbers: number[]): Observable<DocumentResponse> {
    // @ts-ignore
    const params = new HttpParams().append('slug', slug).append('documentNumbers', documentNumbers);

    return this.http
      .get<DocumentResponse>(environment.api + EndPoints.Document, {params})
      .pipe(take(1));
  }

  getNewsList(page: number = 1): Observable<NewsListResponse> {
    const params = new HttpParams().append('page', page.toString());

    return this.http
      .get<NewsListResponse>(environment.api + EndPoints.News, {params})
      .pipe(take(1));
  }

  getOffes(page: number = 1): Observable<NewsListResponse> {
    const params = new HttpParams().append('page', page.toString());

    return this.http
      .get<NewsListResponse>(environment.api + EndPoints.Offer, {params})
      .pipe(take(1));
  }

  getUserData(): Observable<UserInfoResponse> {
    return this.http
      .get<UserInfoResponse>(environment.api + EndPoints.Info)
      .pipe(take(1));
  }

  getNews(id: string): Observable<NewsSingleResponse> {
    return this.http
      .get<NewsSingleResponse>(environment.api + EndPoints.News + '/' + id)
      .pipe(take(1));
  }

  getOffer(id: string): Observable<NewsSingleResponse> {
    return this.http
      .get<NewsSingleResponse>(environment.api + EndPoints.Offer + '/' + id)
      .pipe(take(1));
  }

  getCode(body: GetCodeRequest): Observable<Response<any>> {
    return this.http
      .post<Response<any>>(environment.api + EndPoints.Code, body)
      .pipe(take(1));
  }

  getPackages(): Observable<PackageResponse> {
    return this.http
      .get<PackageResponse>(environment.api + EndPoints.Packages)
      .pipe(take(1));
  }

  getCountries(): Observable<CountriesResponse> {
    return this.http
      .get<CountriesResponse>(environment.api + EndPoints.Countries)
      .pipe(take(1));
  }

  getIntOptions(): Observable<IntOptionsResponse> {
    return this.http
      .get<IntOptionsResponse>(environment.api + EndPoints.IntOptions)
      .pipe(take(1));
  }

  getCities(body: GetCitiesRequest): Observable<CitiesResponse> {
    const params = new HttpParams()
      .append('countryCode', body.countryCode);

    return this.http
      .get<CitiesResponse>(environment.api + EndPoints.Cities, {params})
      .pipe(take(1));
  }

  register(body: RegistrationRequest): Observable<Response<any>> {
    return this.http
      .post<Response<any>>(environment.api + EndPoints.Register, body)
      .pipe(take(1));
  }

  changePassword(body: ChangePasswordRequest): Observable<Response<any>> {
    return this.http
      .post<Response<any>>(environment.api + EndPoints.ChangePassword, body)
      .pipe(take(1));
  }

  callMe(body: CallMeRequest): Observable<Response<any>> {
    return this.http
      .post<Response<any>>(environment.api + EndPoints.CallMe, body)
      .pipe(take(1));
  }

  getAds(): Observable<Response<Ads>> {
    return this.http
      .get<Response<Ads>>(environment.api + EndPoints.Ads)
      .pipe(take(1));
  }

  closeAds(): void {
    this.isAdsClose = true;
    this.http
      .post<Response<null>>(environment.api + EndPoints.AdsClose, null)
      .pipe(take(1))
      .subscribe();
  }

  subscribe(body: { email: string }): Observable<Response<null>> {
    return this.http
      .post<Response<null>>(environment.api + EndPoints.Subscribe, body)
      .pipe(take(1));
  }

  order(body: OrderRequest): Observable<Response<number>> {
    return this.http
      .post<Response<number>>(environment.api + EndPoints.Order, body)
      .pipe(take(1));
  }

  confirmOrder(body: ConfirmOrderRequest): Observable<Response<null>> {
    return this.http
      .post<Response<null>>(environment.api + EndPoints.ConfirmOrder, body)
      .pipe(take(1));
  }

  checkSmsCode(body: { smsId: any; smsCode: any; clientId: any }): Observable<Response<null>> {
    return this.http
      .post<Response<null>>(environment.api + EndPoints.CheckSmsCode, body)
      .pipe(take(1));
  }

  checkCaptchaSubscr(body: { code: any; client: any }): Observable<Response<any>> {
    return this.http
      .post<Response<any>>(environment.api + EndPoints.CheckCaptchaSubscriber, body)
      .pipe(take(1));
  }

}
