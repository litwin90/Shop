import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, zip, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICartData } from '../models';
import { AppPath, SnakeService, AuthService } from '../../shared';
import { CartService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class CartResolveGuard implements Resolve<ICartData> {
    constructor(
        private cartService: CartService,
        private router: Router,
        private snake: SnakeService,
        private authService: AuthService,
    ) {}

    resolve(): Observable<ICartData | null> {
        return zip(
            this.cartService.getProducts(),
            this.cartService.getCartInfo(),
            of(this.authService.getAuthData()),
        ).pipe(
            map(([products, info, { userInfo }]) => {
                if (products && info) {
                    if (!products.length) {
                        if (userInfo?.isAdmin) {
                            this.snake.show({
                                message: `you are admin. admins might not have cart items`,
                            });
                            this.router.navigate([AppPath.Admin]);
                        } else {
                            this.snake.show({
                                message: `you don't have any products in cart yet`,
                            });
                            this.router.navigate([AppPath.ProductsList]);
                        }
                    }
                    return { products, info };
                } else {
                    this.router.navigate([AppPath.ProductsList]);
                    return null;
                }
            }),
        );
    }
}
