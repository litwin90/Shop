import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of, Observable, Subject } from 'rxjs';
import { delay, tap, finalize } from 'rxjs/operators';

import { SnakeService } from './snake.service';
import { AppPaths } from '../shared.constants';
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
        private spinnerService: SpinnerService,
    ) {}

    login() {
        of(true)
            .pipe(
                tap(() => this.spinnerService.showSpinner()),
                delay(2000),
                finalize(() => this.spinnerService.hideSpinner()),
            )
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
                this.authSubject.next(isLoggedIn);
                this.snake.showSnake({ message: 'You are logged in!' });
            });
    }

    logout() {
        this.isLoggedIn = false;
        this.authSubject.next(false);
        this.snake.showSnake({ message: 'You are logged out!' });
        this.router.navigate([AppPaths.ProductsList]);
    }

    getAuthState(): Observable<boolean> {
        return of(this.isLoggedIn);
    }
}
