import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../shared';
import { RouterFacade } from '../../state';
import { IOrder } from '../models';
import { OrdersService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class ResolveOrdersGuard implements Resolve<IOrder[] | null> {
    constructor(
        private routerFacade: RouterFacade,
        private ordersService: OrdersService,
        private authService: AuthService,
    ) {}

    resolve(): Observable<IOrder[] | null> {
        const { userInfo } = this.authService.getAuthData();
        if (!userInfo) {
            this.routerFacade.goToProducts();
            return of(null);
        }
        return this.ordersService.getUserOrders(userInfo.id).pipe(
            tap(orders => {
                if (!orders.length) {
                    this.routerFacade.goToProducts();
                    return of(null);
                }
            }),
        );
    }
}
