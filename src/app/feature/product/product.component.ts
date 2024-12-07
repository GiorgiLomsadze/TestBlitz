import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { APIService } from 'src/app/shared/services/api.service';
import { Category, PackageType } from 'src/app/shared/interfaces/category.interface';
import { Calls, Product } from 'src/app/shared/interfaces/models.interface';
import { SeoService } from 'src/app/shared/services/seo.service';
import { InternetOptions } from './options';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {

  public menu: Category[] = [];
  public activeSlug: Category;
  public isOpen = false;
  public isCityOpen = false;
  public countries: Calls[] = [];
  public cities: Calls[] = [];
  public internetOptions: typeof InternetOptions;
  public internetOptionsRows = ['', ...Object.values(InternetOptions.columns)];
  public internetOptionsColumns = InternetOptions.keys;
  public activeCalls: {
    country?: Calls,
    city?: Calls,
  } = {};

  private products: Product[] = [];
  private activePackage: PackageType;
  private activeRoute$: Subscription;

  constructor(
    private rotuer: Router,
    private activeRoute: ActivatedRoute,
    private api: APIService,
    private seo: SeoService
  ) {
    this.activeRoute$ = this.activeRoute.paramMap
      .pipe(
        tap(params => this.setActivePackage(params)),
        distinctUntilChanged((x, y) => x.get('category') === y.get('category')),
        switchMap(() => this.api.getProducts(this.activePackage.id))
      )
      .subscribe(res => {
        this.products = res.data;
        this.seo.set({ title: this.title, description: null });
      });
  }

  ngOnInit(): void {
  }

  get activeProducts(): Product[] {
    return this.activeSlug ? this.products.filter(item => this.activeSlug.id === item.category.id) : this.products;
  }

  get title(): string {
    return this.api.initData.topMenu.find(item => item.slug === this.activePackage.slug).name;
  }

  setActivePackage(params: ParamMap): void {
    this.activePackage = this.api.initData.topMenu.find(item => item.slug === params.get('category'));

    if (!this.activePackage) { return this.send404(); }

    this.menu = this.activePackage.categories;
    this.activeSlug = this.menu.find(item => item.slug === params.get('slug'));

    if (this.activeSlug && this.activeSlug.slug === 'calls') {
      this.getCountries();
    }
    if (this.activeSlug && this.activeSlug.slug === 'options') {
      this.getOptions();
    }
  }

  send404(): void {
    this.rotuer.navigate(['/error']);
  }

  getLink(category: Category): string {
    const segments: string[] = [];

    segments.push('product');
    segments.push(this.activePackage.slug);
    segments.push(category.slug);

    return '/' + segments.join('/');
  }

  closeSelect(value: string): void {
    this[value] = false;
  }

  setCountry(item: Calls): void {
    this.activeCalls.country = item;
    this.isOpen = false;
    this.activeCalls.city = null;
    this.getCities();
  }

  private getCountries(): void {
    this.api.getCountries()
      .subscribe(res => this.countries = res.data.countries);
  }

  private getOptions(): void {
    this.api.getIntOptions()
      .subscribe(res => {
        InternetOptions.packages[0].prodcuts = res.data[1];
        InternetOptions.packages[1].prodcuts = res.data[2];
        InternetOptions.packages[2].prodcuts = res.data[3];

        this.internetOptions = InternetOptions;
      });
  }

  private getCities(): void {
    this.api.getCities({ countryCode: this.activeCalls.country.home.code })
      .subscribe(res => this.cities = res.data.cities);
  }

  ngOnDestroy(): void {
    this.activeRoute$.unsubscribe();
  }

}
