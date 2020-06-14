import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of, zip } from 'rxjs';
import { finalize, take, catchError, map } from 'rxjs/operators';

import { ICartProduct } from '../models';
import {
    AppPaths,
    SnakeService,
    SpinnerService,
    CartService,
} from '../../shared';
import { CartPaths } from '../cart.constants';
import { ProductService, IProduct } from '../../products';

@Injectable({
    providedIn: 'any',
})
export class CartItemResolveGuard
    implements Resolve<{ cartProduct: ICartProduct; product: IProduct }> {
    constructor(
        private router: Router,
        private snake: SnakeService,
        private cartService: CartService,
        private productService: ProductService,
    ) {}
    resolve(
        activeRouteSnapshot: ActivatedRouteSnapshot,
    ): Observable<{ cartProduct: ICartProduct; product: IProduct } | null> {
        if (!activeRouteSnapshot.paramMap.has(CartPaths.ProductId)) {
            this.snake.show({ message: `URL is wrong` });
            this.router.navigate([AppPaths.Cart]);
            return of(null);
        }

        const productId = activeRouteSnapshot.paramMap.get(CartPaths.ProductId);

        return zip(
            this.cartService.getProduct(productId),
            this.productService.getProduct(productId),
        ).pipe(
            map(([cartProduct, product]: [ICartProduct, IProduct]) => {
                if (product && cartProduct) {
                    return { cartProduct, product };
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
