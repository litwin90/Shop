import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { IOrder } from '../models';
import { OrdersService } from '../services';
import { OrdersPath } from '../orders.constants';

@Injectable({
    providedIn: 'any',
})
export class ResolveOrderDetailsGuard implements Resolve<IOrder | null> {
    constructor(private router: Router, private ordersService: OrdersService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IOrder | null> {
        if (!route.paramMap.has(OrdersPath.OrderId)) {
            return of(null);
        }

        const orderId = route.paramMap.get(OrdersPath.OrderId);

        return this.ordersService.getOrder(orderId).pipe(take(1));
    }
}
