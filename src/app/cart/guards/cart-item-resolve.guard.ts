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
        private spinnerService: SpinnerService,
        private cartService: CartService,
        private productService: ProductService,
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<{ cartProduct: ICartProduct; product: IProduct } | null> {
        if (!route.paramMap.has(CartPaths.ProductId)) {
            this.snake.showSnake({ message: `URL is wrong` });
            this.router.navigate([AppPaths.Cart]);
            return of(null);
        }

        this.spinnerService.showSpinner();
        const productId = route.paramMap.get(CartPaths.ProductId);

        return zip(
            this.cartService.getProduct(productId),
            this.productService.getProduct(productId),
        ).pipe(
            map(([cartProduct, product]: [ICartProduct, IProduct]) => {
                if (product && cartProduct) {
                    return { cartProduct, product };
                } else {
                    this.snake.showSnake({
                        message: `There is no such product in the cart with id ${productId}`,
                    });
                    this.router.navigate([AppPaths.Cart]);
                    return null;
                }
            }),
            take(1),
            catchError(() => {
                this.snake.showSnake({
                    message: 'Ups, something went wrong',
                });
                this.router.navigate([AppPaths.Cart]);
                return of(null);
            }),
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }
}
