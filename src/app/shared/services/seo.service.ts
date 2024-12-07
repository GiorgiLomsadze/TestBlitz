import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { SeoData } from '../interfaces/seo.interface';

@Injectable()
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
  ) { }

  set(data: SeoData = {}): void {
    const description = data.description || '';
    let title = 'CGC';
    if (data.title) {
      title += ' - ' + data.title;
    }
    const url = location.origin + this.router.url.split('?')[0];
    const image = data.image ? environment.storage + 'images/' + data.image : '';

    document.querySelector('[rel=canorical]').setAttribute('href', url);

    this.title.setTitle(title);

    // SEO
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });

    // Facebook
    this.meta.updateTag({ property: 'og:locale', content: 'ka_GE' });
    this.meta.updateTag({ property: 'og:site_name', content: 'CGC' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
  }

}
