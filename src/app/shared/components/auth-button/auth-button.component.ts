import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services';
import { WithSubscriptions } from '../../classes';

@Component({
    selector: 'app-auth-button',
    templateUrl: './auth-button.component.html',
    styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent extends WithSubscriptions implements OnInit {
    isLoggedIn = false;

    constructor(public authService: AuthService) {
        super();
    }

    ngOnInit(): void {
        const auth$ = this.authService.authSubject.subscribe(
            ({ isLoggedIn }) => {
                this.isLoggedIn = isLoggedIn;
            },
        );
        this.subscriptions.push(auth$);
    }

    onToggleAuth() {
        if (this.isLoggedIn) {
            this.authService.logout();
        } else {
            this.authService.login();
        }
    }
}
