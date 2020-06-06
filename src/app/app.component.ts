import { Component, OnInit, OnDestroy } from '@angular/core';

import { appTabsConfig } from './app-routing.module';
import { Subscription } from 'rxjs';
import { SpinnerService } from './shared';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    appTabsConfig = appTabsConfig;
    private subscriptions: Subscription[] = [];

    isSpinnerDisplayed = false;

    constructor(private spinnerService: SpinnerService) {}

    ngOnInit(): void {
        this.isSpinnerDisplayed = this.spinnerService.isDisplayed;
        const spinnerSubscription = this.spinnerService.spinnerSubject.subscribe(
            isDisplayed => {
                this.isSpinnerDisplayed = isDisplayed;
            },
        );
        this.subscriptions.push(spinnerSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.map(subscription => subscription.unsubscribe());
    }
}
