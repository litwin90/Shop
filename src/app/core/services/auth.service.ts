import { Injectable } from '@angular/core';

import { of, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { SnakeService } from '../../shared/services/snake.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn = false;

    authSubject: Subject<boolean> = new Subject();

    constructor(private snake: SnakeService) {}

    login() {
        of(true)
            .pipe(delay(2000))
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
    }

    getAuthState(): Observable<boolean> {
        return of(this.isLoggedIn);
    }
}
