import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { APIService } from 'src/app/shared/services/api.service';
import {
  Category,
  PackageType,
} from 'src/app/shared/interfaces/category.interface';
import { ProductType } from 'src/app/shared/interfaces/models.interface';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
  public packages: PackageType[];
  public userProducts = new Set();
  public productTypes = ProductType;

  public doubleCategory: Category[] = [{ name: 'პაკეტები' }];

  constructor(private api: APIService, private seo: SeoService) {
    this.seo.set({ title: 'პირადი კაბინეტი' });

    combineLatest([this.api.getPackages(), this.api.getUserData()])
      .pipe(
        tap(([packageRes, userRes]) => {
          this.doubleCategory[0].products = packageRes.data.find(
            (item) => item.id === ProductType.double
          ).products;
          userRes.data.packages.forEach((item) =>
            item.list.forEach((p) => this.userProducts.add(p.id))
          );

          return packageRes;
        })
      )
      .subscribe(([res]) => (this.packages = res.data));
  }

  ngOnInit(): void {}

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
