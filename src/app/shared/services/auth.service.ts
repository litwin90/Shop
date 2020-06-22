import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of, zip, BehaviorSubject } from 'rxjs';
import { delay, tap, finalize, map } from 'rxjs/operators';

import { DialogService } from './dialog.service';
import { REQUESTS_DELAY, AppPath } from '../shared.constants';
import { SpinnerService } from './spinner.service';
import { IAuthData, IBaseUserInfo } from '../models';
import { ConfirmationService } from './confirmation.service';
import { TabsService } from './tabs.service';
import { UsersService } from './users.service';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authData: IAuthData = {
        isLoggedIn: false,
    };

    authSubject: BehaviorSubject<IAuthData> = new BehaviorSubject({
        isLoggedIn: false,
    });

    constructor(
        private dialog: DialogService,
        private spinner: SpinnerService,
        private router: Router,
        private confirmation: ConfirmationService,
        private tabs: TabsService,
        private usersService: UsersService,
        private localStorage: LocalStorageService,
    ) {}

    private updateAuthData(authData: IAuthData) {
        this.authData = authData;
        this.authSubject.next(authData);
    }

    private createAuthData({
        isLoggedIn,
        firstName,
        secondName,
        isAdmin,
        userId,
    }): IAuthData {
        return {
            isLoggedIn,
            userInfo: {
                id: userId,
                firstName,
                secondName,
                isAdmin,
            },
        };
    }

    login() {
        const user = this.localStorage.getItem<IBaseUserInfo>(
            environment.LSUserKey,
        );
        return zip(
            this.confirmation.ask({
                title: 'Authentication',
                message: 'Do you want to login as admin?',
            }),
            user?.id
                ? of(user)
                : this.usersService
                      .addUser({
                          firstName: 'Demo',
                          secondName: 'User',
                      })
                      .pipe(
                          tap(newUser =>
                              this.localStorage.setItem(
                                  environment.LSUserKey,
                                  newUser,
                              ),
                          ),
                      ),
        ).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            tap(([isAdmin, { id, firstName, secondName }]) => {
                const authData = this.createAuthData({
                    isAdmin,
                    isLoggedIn: true,
                    userId: id,
                    firstName,
                    secondName,
                });
                this.updateAuthData(authData);
                this.tabs.update(isAdmin);
                this.router.navigate([
                    isAdmin ? AppPath.Admin : AppPath.ProductsList,
                ]);
            }),
            finalize(() => {
                this.dialog.show({ message: 'You are logged in!' });
                this.spinner.hide();
            }),
        );
    }

    logout() {
        return of(true).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            map(() => {
                this.authData = {
                    isLoggedIn: false,
                    userInfo: null,
                };
                this.updateAuthData(this.authData);
                this.tabs.update(false);
            }),
            finalize(() => {
                this.dialog.show({ message: 'You are logged out!' });
                this.spinner.hide();
                this.router.navigate([AppPath.ProductsList]);
            }),
        );
    }

    getAuthData(): IAuthData {
        return this.authData;
    }
}
