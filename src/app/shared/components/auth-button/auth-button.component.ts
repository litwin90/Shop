import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services';

@Component({
    selector: 'app-auth-button',
    templateUrl: './auth-button.component.html',
    styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit, OnDestroy {
    private authSubscription$: Subscription;

    isLoggedIn = false;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authSubscription$ = this.authService.authSubject.subscribe(
            isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            },
        );
    }

    ngOnDestroy(): void {
        this.authSubscription$.unsubscribe();
    }

    onToggleAuth() {
        if (this.isLoggedIn) {
            this.authService.logout();
        } else {
            this.authService.login();
        }
    }
}
