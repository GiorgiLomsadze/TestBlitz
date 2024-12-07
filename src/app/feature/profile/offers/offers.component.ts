import { Component, OnInit } from '@angular/core';

import { APIService } from 'src/app/shared/services/api.service';
import { Ads, News } from 'src/app/shared/interfaces/models.interface';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  public isAdsClose: boolean;
  public ads: Ads;
  public offers: News[];
  public storage = environment.storage + 'images/';

  constructor(
    private api: APIService,
    private seo: SeoService,
  ) {
    this.seo.set({ title: 'პირადი კაბინეტი' });

    this.api.getOffes()
      .subscribe(res => this.offers = res.data);
    this.isAdsClose = this.api.isAdsClose;

    if (!this.api.isAdsClose) {
      this.api.getAds().subscribe(res => this.ads = res.data);
    }
  }

  ngOnInit(): void {
  }

}
