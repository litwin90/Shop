import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppPath, AuthService } from '../../shared';
import { OrderData } from '../models';
import { CartService } from '../../cart';

@Injectable({
    providedIn: 'root',
})
export class ResolveOrderCreateGuard implements Resolve<OrderData | null> {
    constructor(
        private router: Router,
        private cartService: CartService,
        private authService: AuthService,
    ) {}

    resolve(): Observable<OrderData | null> {
        return zip(
            of(this.cartService.getProducts()),
            of(this.cartService.getCartInfo()),
            of(this.authService.getAuthData()),
        ).pipe(
            map(([products, cartInfo, authData]) => {
                if (products && cartInfo && authData && authData.userInfo) {
                    return {
                        products,
                        quantity: cartInfo.totalQuantity,
                        cost: cartInfo.totalSum,
                        userId: authData.userInfo.id,
                    };
                }
                this.router.navigate([AppPath.Cart]);
                return null;
            }),
        );
    }
}
