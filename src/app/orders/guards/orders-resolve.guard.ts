import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IOrder } from '../models/order';
import { OrdersService } from '../services';
import { AppPaths } from '../../shared';

@Injectable({
    providedIn: 'any',
})
export class OrdersResolveGuard implements Resolve<IOrder[] | null> {
    constructor(private router: Router, private ordersService: OrdersService) {}

    resolve(): Observable<IOrder[] | null> {
        return this.ordersService.getUserOrders().pipe(
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
