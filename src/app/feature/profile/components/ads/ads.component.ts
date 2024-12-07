import { Component, OnInit, ElementRef, Input } from '@angular/core';

import { APIService } from 'src/app/shared/services/api.service';
import { Ads } from 'src/app/shared/interfaces/models.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  @Input() data: Ads;
  public storage = environment.storage + 'images/';

  constructor(
    private el: ElementRef,
    private api: APIService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.el.nativeElement.style.display = 'none';
    this.api.closeAds();
  }

}
