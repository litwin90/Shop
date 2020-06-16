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
    AuthService,
} from '../../shared';
import { IOrder, OrderData } from '../models';

@Injectable({
    providedIn: 'root',
})
export class OrderCreateResolveGuard implements Resolve<OrderData | null> {
    constructor(
        private router: Router,
        private cartService: CartService,
        private authService: AuthService,
    ) {}

    resolve(): Observable<OrderData | null> {
        return zip(
            this.cartService.getProducts(),
            this.cartService.getCartInfo(),
            of(this.authService.getAuthData()),
        ).pipe(
            map(([products, cartInfo, authData]) => {
                if (products && cartInfo && authData && authData.userInfo) {
                    return {
                        products,
                        quantity: cartInfo.totalQuantity,
                        cost: cartInfo.totalSum,
                        userId: authData.userInfo.userId,
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
