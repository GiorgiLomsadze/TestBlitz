import { Component, OnInit } from '@angular/core';

import { APIService } from 'src/app/shared/services/api.service';
import { Company } from 'src/app/shared/interfaces/models.interface';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  public companies: Company[];

  constructor(
    private seo: SeoService,
    private api: APIService
  ) {
    this.api.getCompanyProducts()
      .subscribe(res => {
        this.companies = res.data;
        this.seo.set({ title: 'იურიდიული კლიენტებისთვის' });
      });
  }

  ngOnInit(): void {
  }

}
