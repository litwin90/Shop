import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of, Subject, Subscription, PartialObserver } from 'rxjs';
import { delay, tap, finalize, map } from 'rxjs/operators';

import { SnakeService } from './snake.service';
import { REQUESTS_DELAY, AppPaths } from '../shared.constants';
import { SpinnerService } from './spinner.service';
import { IAuthData } from '../models';
import { GeneratorService } from './generator.service';
import { ConfirmationService } from './confirmation.service';
import { TabsService } from './tabs.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authData: IAuthData = {
        isLoggedIn: false,
    };

    authSubject: Subject<IAuthData> = new Subject();

    constructor(
        private snake: SnakeService,
        private spinner: SpinnerService,
        private generator: GeneratorService,
        private router: Router,
        private confirmation: ConfirmationService,
        private tabs: TabsService,
    ) {}

    login(next?: (value: IAuthData) => void): Subscription {
        return this.confirmation
            .askConfirmation({
                title: 'Authentication',
                message: 'Do you want to login as admin?',
            })
            .pipe(
                tap(() => this.spinner.show()),
                delay(REQUESTS_DELAY),
                map(asAdmin => {
                    this.authData = {
                        isLoggedIn: true,
                        userInfo: {
                            firstName: 'Demo',
                            secondName: 'Admin',
                            userId: this.generator.getRandomString(10),
                            isAdmin: asAdmin,
                        },
                    };
                    this.authSubject.next(this.authData);
                    if (asAdmin) {
                        this.tabs.tabsSubject.next(this.tabs.adminTabs);
                        this.router.navigate([AppPaths.Admin]);
                    } else {
                        this.tabs.tabsSubject.next(this.tabs.userTabs);
                        this.router.navigate([AppPaths.ProductsList]);
                    }
                    return this.authData;
                }),
                finalize(() => {
                    this.snake.show({ message: 'You are logged in!' });
                    this.spinner.hide();
                }),
            )
            .subscribe(next);
    }

    logout(): Subscription {
        return of(true)
            .pipe(
                tap(() => this.spinner.show()),
                delay(REQUESTS_DELAY),
                map(() => {
                    this.authData = {
                        isLoggedIn: false,
                        userInfo: null,
                    };
                    this.authSubject.next(this.authData);
                    this.tabs.tabsSubject.next(this.tabs.userTabs);
                    return this.authData;
                }),
                finalize(() => {
                    this.snake.show({ message: 'You are logged out!' });
                    this.spinner.hide();
                    this.router.navigate([AppPaths.ProductsList]);
                }),
            )
            .subscribe();
    }

    getAuthData(): IAuthData {
        return this.authData;
    }
}
