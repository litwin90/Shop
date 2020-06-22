import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

import { FlexDirection } from '../shared';
import { adminTabsConfig } from './admin.constants';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../app.state';
import { selectRouterData } from '../router-state';

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
