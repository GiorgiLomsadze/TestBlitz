import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.user
      .pipe(
        map<number, boolean>(id => !id),
        tap(user => !user && this.router.navigate(['/profile/cabinet'])),
      );
  }

  canActivateChild(): Observable<boolean> {
    return this.auth.user
      .pipe(
        map<number, boolean>(id => !!id),
        tap(user => !user && this.router.navigate(['/login'])),
      );
  }

}
