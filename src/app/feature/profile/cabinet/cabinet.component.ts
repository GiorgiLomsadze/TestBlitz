import { Component, OnInit } from '@angular/core';

import { APIService } from 'src/app/shared/services/api.service';
import {
  Ads,
  UserInfo,
  ProductType,
  Product,
} from 'src/app/shared/interfaces/models.interface';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent implements OnInit {
  public info: UserInfo;
  public isAdsClose: boolean;
  public ads: Ads;
  public isOpen = false;
  public activeAddress = 0;
  public balance: string;

  constructor(private seo: SeoService, private api: APIService) {
    this.seo.set({ title: 'პირადი კაბინეტი' });

    this.balance = this.api.initData.options.balance;
    this.api.getUserData().subscribe((res) => (this.info = res.data));
    this.isAdsClose = this.api.isAdsClose;

    if (!this.api.isAdsClose) {
      this.api.getAds().subscribe((res) => (this.ads = res.data));
    }
  }

  ngOnInit(): void {}

  closeSelect(value: string): void {
    this[value] = false;
  }

  setAddress(index: number): void {
    this.activeAddress = index;
  }

  categoryName(product: Product): string {
    if (product.type.id === ProductType.double) {
      return 'ორმაგი შეთავაზება';
    } else {
      return product.category.name;
    }
  }

  getIcon(type: ProductType): string {
    return {
      [ProductType.internet]: 'globe',
      [ProductType.tv]: 'tv',
      [ProductType.telephone]: 'phone',
      [ProductType.double]: 'ticket',
      [ProductType.offer]: 'gift',
    }[type];
  }
}
