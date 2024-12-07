import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { News } from 'src/app/shared/interfaces/models.interface';
import { environment } from 'src/environments/environment';
import { APIService } from 'src/app/shared/services/api.service';
import { NewsType } from 'src/app/shared/enums/news-type.enum';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.scss'],
})
export class NewsSingleComponent implements OnInit {
  public news: News[] = [];
  public single: News;
  public storage = environment.storage + 'images/';

  public path: string;
  public type: NewsType;
  public title: string;
  public typeSingle: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private seo: SeoService,
    private api: APIService
  ) {
    this.path = this.activeRoute.snapshot.url[0].path;
    this.type = this.path === 'news' ? NewsType.News : NewsType.Offer;
    this.title = this.type === NewsType.News ? 'სიახლეები' : 'შეთავაზებები';
    this.typeSingle = this.type === NewsType.News ? 'სიახლე' : 'შეთავაზება';
    this.loadNews();
  }

  ngOnInit(): void {}

  loadNews(): void {
    const request = this.type === NewsType.News ? 'getNews' : 'getOffer';

    this.activeRoute.paramMap
      .pipe(switchMap((params) => this.api[request](params.get('id'))))
      .subscribe((res) => {
        this.news = res.data.more;
        this.single = res.data.news;
        this.seo.set({
          title: this.title,
          description: this.single.text,
          image: this.single.image,
        });
      });
  }
}
