import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { APIService } from 'src/app/shared/services/api.service';
import { Document } from 'src/app/shared/interfaces/models.interface';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  public documents: Document[] = [];
  public storage = environment.storage + 'documents/';
  public title = '';

  private activeRoute$: Subscription;

  constructor(
    private seo: SeoService,
    private api: APIService,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute$ = this.activeRoute.paramMap
      .pipe(switchMap(e => this.api.getDocuments(e.get('slug'), [])))
      .subscribe(res => {
        this.documents = res.data.documents;
        this.title = res.data.title;
        this.seo.set({ title: this.title });
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeRoute$.unsubscribe();
  }

}
