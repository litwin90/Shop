import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of, Observable, Subject } from 'rxjs';
import { delay, tap, finalize, map } from 'rxjs/operators';

import { SnakeService } from './snake.service';
import { AppPaths, REQUESTS_DELAY } from '../shared.constants';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn = false;

    authSubject: Subject<boolean> = new Subject();

    constructor(
        private snake: SnakeService,
        private router: Router,
        private spinner: SpinnerService,
    ) {}

    login() {
        of(true)
            .pipe(
                tap(() => this.spinner.show()),
                delay(REQUESTS_DELAY),
                finalize(() => this.spinner.hide()),
            )
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
                this.authSubject.next(isLoggedIn);
                this.snake.show({ message: 'You are logged in!' });
            });
    }

    logout() {
        this.isLoggedIn = false;
        this.authSubject.next(false);
        this.snake.show({ message: 'You are logged out!' });
        this.router.navigate([AppPaths.ProductsList]);
    }

    getAuthState(): Observable<boolean> {
        return of(true).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            map(() => this.isLoggedIn),
            finalize(() => {
                this.spinner.hide();
            }),
        );
    }
}
