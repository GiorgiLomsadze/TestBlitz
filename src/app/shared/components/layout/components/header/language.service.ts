import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private selectedLanguage: string = 'ge';

  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      const selectedLanguage = params['lang'];
      if (selectedLanguage) {
        this.selectedLanguage = selectedLanguage;
        this.translate.use(selectedLanguage);
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Ensure language is updated on NavigationEnd
        this.updateLanguageParameter();
      });
  }

  getSelectedLanguage(): string {
    return this.selectedLanguage;
  }

  setSelectedLanguage(language: string): void {
    this.selectedLanguage = language;
    this.translate.use(language);
    this.updateLanguageParameter();
  }

  private updateLanguageParameter(): void {
    // Use replaceUrl: true to replace the current history entry
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lang: this.selectedLanguage },
      replaceUrl: true,
    });
  }
}







