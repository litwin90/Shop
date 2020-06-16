import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IOrder } from '../models';
import { OrdersService } from '../services';
import { AppPaths, AuthService } from '../../shared';

@Injectable({
    providedIn: 'any',
})
export class OrdersResolveGuard implements Resolve<IOrder[] | null> {
    constructor(
        private router: Router,
        private ordersService: OrdersService,
        private authService: AuthService,
    ) {}

    resolve(): Observable<IOrder[] | null> {
        const { userInfo } = this.authService.getAuthData();
        if (!userInfo) {
            this.router.navigate([AppPaths.ProductsList]);
            return of(null);
        }
        return this.ordersService.getUserOrders(userInfo.userId).pipe(
            tap(orders => {
                if (!orders.length) {
                    this.router.navigate([AppPaths.ProductsList]);
                    return of(null);
                }
            }),
            catchError(() => {
                this.router.navigate([AppPaths.ProductsList]);
                return of(null);
            }),
        );
    }
}
