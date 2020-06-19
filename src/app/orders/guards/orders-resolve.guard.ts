import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';

import { IOrder } from '../models';
import { OrdersService } from '../services';
import { AppPath, AuthService } from '../../shared';

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
            this.router.navigate([AppPath.ProductsList]);
            return of(null);
        }
        return this.ordersService.getUserOrders(userInfo.id).pipe(
            tap(orders => {
                if (!orders.length) {
                    this.router.navigate([AppPath.ProductsList]);
                    return of(null);
                }
            }),
            catchError(() => {
                this.router.navigate([AppPath.ProductsList]);
                return of(null);
            }),
        );
    }
}
