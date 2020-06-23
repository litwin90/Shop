import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IAppState } from '../../app.state';
import { RouterActions } from '../../router-state';
import { AuthService } from '../../shared';
import { IOrder } from '../models';
import { OrdersService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class ResolveOrdersGuard implements Resolve<IOrder[] | null> {
    constructor(
        private store: Store<IAppState>,
        private ordersService: OrdersService,
        private authService: AuthService,
    ) {}

    resolve(): Observable<IOrder[] | null> {
        const { userInfo } = this.authService.getAuthData();
        if (!userInfo) {
            this.store.dispatch(RouterActions.goToProducts());
            return of(null);
        }
        return this.ordersService.getUserOrders(userInfo.id).pipe(
            tap(orders => {
                if (!orders.length) {
                    this.store.dispatch(RouterActions.goToProducts());
                    return of(null);
                }
            }),
        );
    }
}
