import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';

import { ICartProduct } from '../models';
import { AppPaths, SnakeService, CartService } from '../../shared';
import { CartPaths } from '../cart.constants';

@Injectable({
    providedIn: 'any',
})
export class CartItemResolveGuard implements Resolve<ICartProduct> {
    constructor(
        private router: Router,
        private snake: SnakeService,
        private cartService: CartService,
    ) {}

    resolve(
        activeRouteSnapshot: ActivatedRouteSnapshot,
    ): Observable<ICartProduct | null> {
        if (!activeRouteSnapshot.paramMap.has(CartPaths.ProductId)) {
            this.snake.show({ message: `URL is wrong` });
            this.router.navigate([AppPaths.Cart]);
            return of(null);
        }

        const productId = activeRouteSnapshot.paramMap.get(CartPaths.ProductId);

        return this.cartService.getProduct(productId).pipe(
            map((cartProduct: ICartProduct) => {
                if (cartProduct) {
                    return cartProduct;
                } else {
                    this.router.navigate([AppPaths.Cart]);
                    return null;
                }
            }),
            take(1),
            catchError(() => {
                this.router.navigate([AppPaths.Cart]);
                return of(null);
            }),
        );
    }
}
