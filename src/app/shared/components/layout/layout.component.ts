import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public isProfile: Observable<boolean>;
  public isHome: Observable<boolean>;

  constructor(
    private router: Router,
  ) {
    this.isHome = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url === '/')
      );

    this.isProfile = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        switchMap((e: NavigationEnd) => of(e.url.includes('profile')))
      );
  }

  ngOnInit(): void {
  }

}
