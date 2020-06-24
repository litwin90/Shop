import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { FlexDirection } from '../shared';
import { IAppState, selectRouterData } from '../state';
import { adminTabsConfig } from './admin.constants';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    FlexDirection = FlexDirection;
    isProductListDisplayed: boolean;
    adminTabsConfig = adminTabsConfig;

    routerData$: Observable<Data>;

    constructor(private store: Store<IAppState>) {}

    ngOnInit(): void {
        this.routerData$ = this.store.pipe(select(selectRouterData));
    }
}
