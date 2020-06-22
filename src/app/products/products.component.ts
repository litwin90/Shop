import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { IAppState } from '../app.state';
import { Observable } from 'rxjs';
import { selectRouterData } from '../router-state';

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
