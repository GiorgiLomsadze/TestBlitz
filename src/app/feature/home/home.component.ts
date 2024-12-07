import { Component, OnInit } from '@angular/core';

import { Home } from 'src/app/shared/interfaces/init.interface';
import { APIService } from 'src/app/shared/services/api.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: Home;

  constructor(
    private api: APIService,
    private seo: SeoService,
  ) {
    this.api.getHome()
      .subscribe(res => {
        this.data = res.data;
        this.seo.set();
      });
  }

  ngOnInit(): void {
  }

}
