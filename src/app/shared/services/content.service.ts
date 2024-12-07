import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ContentService {

    public data: any;

    constructor(
        private http: HttpClient
    ) { }

    init(): Observable<any> {
        return this.http.get('/assets/content.json')
            .pipe(
                take(1),
                tap(res => this.data = res)
            );
    }

}
