import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of, zip } from 'rxjs';
import { delay, catchError, finalize, map } from 'rxjs/operators';

import {
    CartService,
    SpinnerService,
    SnakeService,
    AppPaths,
    REQUESTS_DELAY,
} from '../../shared';
import { IOrder, OrderData } from '../models';

@Injectable({
    providedIn: 'root',
})
export class OrderCreateResolveGuard implements Resolve<OrderData | null> {
    constructor(private router: Router, private cartService: CartService) {}

    resolve(): Observable<Pick<
        IOrder,
        'cost' | 'quantity' | 'products'
    > | null> {
        return zip(
            this.cartService.getProducts(),
            this.cartService.getCartInfo(),
        ).pipe(
            map(([products, cartInfo]) => {
                if (products && cartInfo) {
                    return {
                        products,
                        quantity: cartInfo.totalQuantity,
                        cost: cartInfo.totalSum,
                    };
                }
                this.router.navigate([AppPaths.Cart]);
                return null;
            }),
            catchError(() => {
                this.router.navigate([AppPaths.Cart]);
                return of(null);
            }),
        );
    }
}
