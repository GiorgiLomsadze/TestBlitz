import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take, tap, map, catchError, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginRequest } from '../interfaces/request.interface';
import { LoginResponse, UnAuthResponse } from '../interfaces/response.interface';
import { EndPoints } from '../enums/end-points.enum';
import { User } from '../interfaces/models.interface';

@Injectable()
export class AuthService {

  public user: Subject<number | boolean> = new BehaviorSubject(!!localStorage.getItem('token'));

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(body: LoginRequest): Observable<LoginResponse | UnAuthResponse | number> {
    return this.http
      .post<LoginResponse | UnAuthResponse>(environment.api + EndPoints.Login, body)
      .pipe(
        take(1),
        tap(res => {
          if ((res as LoginResponse).access_token) {
            this.setToken((res as LoginResponse).access_token);
            this.setUser(true);
          }
        }),
      );
  }

  logout(): void {
    this.http
      .post(environment.api + EndPoints.LogOut, {})
      .pipe(take(1))
      .subscribe(() => this.clear());
  }

  clear(): void {
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['/']);
  }

  setUser(logUser = false): void {
    if (!localStorage.getItem('token')) {
      return this.user.next(null);
    }

    this.http
      .get<User>(environment.api + EndPoints.User)
      .pipe(
        take(1),
      ).subscribe((res) => {
        this.user.next(res.clientId);
        if (logUser) {
          this.router.navigate(['/profile/cabinet']);
        }
      }, () => of(this.user.next(null)));
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

}
