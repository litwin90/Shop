import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { FlexDirection } from '../shared';
import { IAppState, selectRouterData } from '../state';

@Component({
    templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
    FlexDirection = FlexDirection;
    routerData$: Observable<Data>;

    constructor(private store: Store<IAppState>) {}

    ngOnInit(): void {
        this.routerData$ = this.store.pipe(select(selectRouterData));
    }
}
