import { Injectable } from '@angular/core';

import { of, Observable, Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authSubject: Subject<boolean> = new Subject();

    login() {
        of(true)
            .pipe(delay(2000))
            .subscribe(isLoggedIn => {
                this.authSubject.next(isLoggedIn);
            });
    }

    logout() {
        this.authSubject.next(false);
    }
}
