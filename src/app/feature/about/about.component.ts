import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { APIService } from 'src/app/shared/services/api.service';
import { About } from 'src/app/shared/interfaces/init.interface';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/shared/enums/end-points.enum';
import { SeoService } from 'src/app/shared/services/seo.service';
import { Document } from 'src/app/shared/interfaces/models.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public page: EndPoints;
  public data: About;
  public documents: Document[] = [];
  public storage = environment.storage + 'images/';

  constructor(
    private router: Router,
    private seo: SeoService,
    private api: APIService,
  ) {
    this.page = this.router.url.slice(1) as EndPoints;
    this.api.getPage(this.page)
      .subscribe(res => {
        this.data = res.data;
        this.seo.set({ title: this.data.title, description: this.data.text, image: this.data.image });
      });

    if (this.page === 'how') {
      this.api.getDocuments('contract', null)
        .subscribe(res => this.documents = res.data.documents);
    }
  }

  ngOnInit(): void {
  }

}
// format-and-translate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAndTranslate'
})
export class FormatAndTranslatePipe implements PipeTransform {
  transform(value: string): string {
    // Perform your text formatting logic here
    // For example, trim the text
    return value.trim();
  }
}
