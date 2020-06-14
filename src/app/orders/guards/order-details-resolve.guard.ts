import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRoute,
    ParamMap,
    Router,
    ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import {
    switchMap,
    catchError,
    take,
    finalize,
    tap,
    delay,
    skip,
    skipUntil,
    skipWhile,
    filter,
} from 'rxjs/operators';

import { IOrder } from '../models';
import { OrdersService } from '../services';
import { OrdersPaths } from '../orders.constants';
import { AppPaths, SpinnerService, REQUESTS_DELAY } from '../../shared';

@Injectable({
    providedIn: 'any',
})
export class OrderDetailsResolveGuard implements Resolve<IOrder | null> {
    constructor(
        private router: Router,
        private ordersService: OrdersService,
        private spinner: SpinnerService,
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IOrder | null> {
        if (!route.paramMap.has(OrdersPaths.OrderId)) {
            return of(null);
        }

        const orderId = route.paramMap.get(OrdersPaths.OrderId);

        return this.ordersService.getOrder(orderId).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            take(1),
            catchError(() => {
                this.router.navigate([AppPaths.Orders]);
                return of(null);
            }),
            finalize(() => {
                this.spinner.hide();
            }),
        );
    }
}
