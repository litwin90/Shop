import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from '../../cart';
import { AuthService } from '../../shared';
import { RouterFacade } from '../../state';
import { OrderData } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ResolveOrderCreateGuard implements Resolve<OrderData | null> {
    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private routerFacade: RouterFacade,
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
                this.routerFacade.goToCart();
                return null;
            }),
        );
    }
}
