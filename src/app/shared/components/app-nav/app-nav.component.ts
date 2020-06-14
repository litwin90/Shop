import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpinnerService, AuthService } from '../../services';
import { AppPaths, appTabsConfig } from '../../shared.constants';
import { WithSubscriptions } from '../../classes';

@Component({
    selector: 'app-nav',
    templateUrl: './app-nav.component.html',
    styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent extends WithSubscriptions implements OnInit {
    appTabsConfig = appTabsConfig;
    isSpinnerDisplayed: boolean;

    constructor(
        private spinner: SpinnerService,
        private router: Router,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.isSpinnerDisplayed = this.spinner.isDisplayed;
        this.authService.login();
        const spinner$ = this.spinner.spinnerSubject.subscribe(isDisplayed => {
            this.isSpinnerDisplayed = isDisplayed;
        });
        this.subscriptions.push(spinner$);
        this.router.navigate([AppPaths.ProductsList]);
    }
}
