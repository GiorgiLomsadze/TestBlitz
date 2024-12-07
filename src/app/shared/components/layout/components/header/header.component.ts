import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';

import { APIService } from 'src/app/shared/services/api.service';
import { PackageType } from 'src/app/shared/interfaces/category.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

import { TranslationService } from './translation.service';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public menu: PackageType[] = [];
  public url = '';
  public isProfile: boolean;

  public user: number | boolean;
  public user$: Subscription;

  public router$: Subscription;

  selectedLanguage: string;

  constructor(
    private api: APIService,
    private auth: AuthService,
    private router: Router,

    private translationService: TranslationService,
    private route: ActivatedRoute,
    private languageService: LanguageService    

  ) {
    this.menu = this.api.initData.topMenu;
    this.router$ = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        tap((e: NavigationEnd) => this.url = e.url),
        switchMap((e: NavigationEnd) => of(e.url.includes('profile'))),
        tap(e => this.isProfile = e)
      ).subscribe();
    this.user$ = this.auth.user.subscribe(user => this.user = user);

    this.route.queryParams.subscribe((params) => {
      const selectedLanguage = params['lang'];
      if (selectedLanguage) {
          this.languageService.setSelectedLanguage(selectedLanguage);
      }
      this.selectedLanguage = this.languageService.getSelectedLanguage();
      this.translationService.setLanguage(this.selectedLanguage);

    });

  }

  ngOnInit(): void {

  }

  urlStartWith(path: string): boolean {
    return this.url.startsWith(`/product/${path}`);
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
    this.user$.unsubscribe();
  }

  private updateLanguageParameter(): void {
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { lang: this.selectedLanguage },
        queryParamsHandling: 'merge',
    });
  }
  

  changeLanguage(language: string): void {
    this.languageService.setSelectedLanguage(language);
    this.selectedLanguage = language;
    this.translationService.setLanguage(language);
    this.updateLanguageParameter();
  }
  
}








