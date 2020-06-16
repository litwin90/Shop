import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { TabsConfig } from '../models';
import { appTabsConfig } from '../shared.constants';

@Injectable({
    providedIn: 'any',
})
export class TabsService {
    tabsSubject: Subject<TabsConfig> = new Subject();

    constructor() {
        this.tabsSubject.next(this.userTabs);
    }

    get adminTabs(): TabsConfig {
        return appTabsConfig.filter(({ forAdmin }) => forAdmin);
    }

    get userTabs(): TabsConfig {
        return appTabsConfig.filter(({ forUser }) => forUser);
    }
}
