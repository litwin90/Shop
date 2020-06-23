import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IAppState } from '../../app.state';
import { IOrder, OrdersService } from '../../orders';
import { RouterActions } from '../../router-state';
import { AuthService } from '../../shared';

@Injectable({
    providedIn: 'root',
})
export class ResolveAdminOrdersGuard implements Resolve<IOrder[] | null> {
    constructor(
        private ordersService: OrdersService,
        private authService: AuthService,
        private store: Store<IAppState>,
    ) {}

    resolve(): Observable<IOrder[] | null> {
        const { userInfo } = this.authService.getAuthData();
        if (!userInfo) {
            this.store.dispatch(RouterActions.goToAdmin());
            return of(null);
        }
        return this.ordersService.getAllOrders().pipe(
            tap(orders => {
                if (!orders.length) {
                    this.store.dispatch(RouterActions.goToAdmin());
                    return of(null);
                }
            }),
        );
    }
}
