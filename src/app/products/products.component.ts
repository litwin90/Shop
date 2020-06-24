import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IAppState, selectRouterData } from '../state';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
    routerData$: Observable<Data>;

    constructor(private store: Store<IAppState>) {}

    ngOnInit(): void {
        this.routerData$ = this.store.pipe(select(selectRouterData));
    }
}
