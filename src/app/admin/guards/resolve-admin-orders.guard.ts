import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IOrder, OrdersService } from '../../orders';
import { AuthService } from '../../shared';
import { RouterFacade } from '../../state';

@Injectable({
    providedIn: 'root',
})
export class ResolveAdminOrdersGuard implements Resolve<IOrder[] | null> {
    constructor(
        private ordersService: OrdersService,
        private authService: AuthService,
        private routerFacade: RouterFacade,
    ) {}

    resolve(): Observable<IOrder[] | null> {
        const { userInfo } = this.authService.getAuthData();
        if (!userInfo) {
            this.routerFacade.goToAdmin();
            return of(null);
        }
        return this.ordersService.getAllOrders().pipe(
            tap(orders => {
                if (!orders.length) {
                    this.routerFacade.goToAdmin();
                    return of(null);
                }
            }),
        );
    }
}
