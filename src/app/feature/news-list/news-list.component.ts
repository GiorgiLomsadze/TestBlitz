import { Component, OnInit } from '@angular/core';

import { News } from 'src/app/shared/interfaces/models.interface';
import { APIService } from 'src/app/shared/services/api.service';
import { NewsType } from 'src/app/shared/enums/news-type.enum';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  public news: News[] = [];
  public nextPage = 1;
  public isMore = false;
  public loading = true;
  public storage = environment.storage + 'images/';

  public title: string;
  public type: NewsType;
  public typeSingle: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private seo: SeoService,
    private api: APIService,
  ) {
    this.type = this.activeRoute.snapshot.url[0].path === 'news' ? NewsType.News : NewsType.Offer;
    this.title = this.type === NewsType.News ? 'სიახლეები' : 'შეთავაზებები';
    this.typeSingle = this.type === NewsType.News ? 'სიახლე' : 'შეთავაზება';
    this.seo.set({ title: this.title });

    this.loadNews();
  }

  ngOnInit(): void {
  }

  loadNews(): void {
    this.loading = true;

    const request = this.type === NewsType.News ? 'getNewsList' : 'getOffes';

    this.api[request](this.nextPage)
      .subscribe(res => {
        this.news = [...this.news, ...res.data];

        this.loading = false;

        const LastPage = res.meta.last_page;
        const CurrentPage = res.meta.current_page;

        if (LastPage > CurrentPage) {
          this.nextPage = CurrentPage + 1;
          this.isMore = true;
        } else {
          this.isMore = false;
        }
      });
  }

  loadMore(): void {
    this.loadNews();
  }

}
