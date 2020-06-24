import { Component, OnInit } from '@angular/core';

import { RouterFacade } from '../../../state';
import { WithSubscriptions } from '../../classes';
import { TabsConfig } from '../../models';
import { AuthService, SpinnerService, TabsService } from '../../services';

@Component({
    selector: 'app-nav',
    templateUrl: './app-nav.component.html',
    styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent extends WithSubscriptions implements OnInit {
    tabs: TabsConfig;
    isSpinnerDisplayed: boolean;

    constructor(
        private spinner: SpinnerService,
        private routerFacade: RouterFacade,
        private tabsService: TabsService,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.authService.login().subscribe();
        this.tabs = this.tabsService.userTabs;
        this.isSpinnerDisplayed = this.spinner.isDisplayed;
        const spinner$ = this.spinner.spinnerSubject.subscribe(isDisplayed => {
            this.isSpinnerDisplayed = isDisplayed;
        });
        const tabs$ = this.tabsService.tabsSubject.subscribe(tabs => {
            this.tabs = tabs;
        });
        this.subscriptions.push(spinner$, tabs$);
        this.routerFacade.goToProducts();
    }
}
