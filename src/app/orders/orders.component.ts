import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { FlexDirection } from '../shared';
import { IAppState } from '../app.state';
import { selectRouterData } from '../router-state';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
    FlexDirection = FlexDirection;
    routerData$: Observable<Data>;

    constructor(private store: Store<IAppState>) {}

    ngOnInit(): void {
        this.routerData$ = this.store.pipe(select(selectRouterData));
    }
}
