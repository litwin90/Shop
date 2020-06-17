import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { TabsConfig } from '../models';
import { appTabsConfig, AppPath } from '../shared.constants';

@Injectable({
    providedIn: 'any',
})
export class TabsService {
    tabsSubject: Subject<TabsConfig> = new Subject();

    constructor(private router: Router) {
        this.tabsSubject.next(this.userTabs);
    }

    get adminTabs(): TabsConfig {
        return appTabsConfig.filter(({ forAdmin }) => forAdmin);
    }

    get userTabs(): TabsConfig {
        return appTabsConfig.filter(({ forUser }) => forUser);
    }

    update(isAdmin: boolean) {
        if (isAdmin) {
            this.tabsSubject.next(this.adminTabs);
            this.router.navigate([AppPath.Admin]);
        } else {
            this.tabsSubject.next(this.userTabs);
            this.router.navigate([AppPath.ProductsList]);
        }
    }
}
