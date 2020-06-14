import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICartProduct, ICartInfo, ICartData } from '../models';
import { CartService, AppPaths, SnakeService } from '../../shared';

@Injectable({
    providedIn: 'root',
})
export class CartResolveGuard implements Resolve<ICartData> {
    constructor(
        private cartService: CartService,
        private router: Router,
        private snake: SnakeService,
    ) {}

    resolve(): Observable<ICartData | null> {
        return zip(
            this.cartService.getProducts(),
            this.cartService.getCartInfo(),
        ).pipe(
            map(([products, info]) => {
                if (products && info) {
                    if (!products.length) {
                        this.snake.show({
                            message: `you don't have any products in cart yet`,
                        });
                        this.router.navigate([AppPaths.ProductsList]);
                    }
                    return { products, info };
                } else {
                    this.router.navigate([AppPaths.ProductsList]);
                    return null;
                }
            }),
        );
    }
}
