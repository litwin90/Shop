import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';

import { ICartProduct } from '../models';
import { AppPath, DialogService } from '../../shared';
import { CartPath } from '../cart.constants';
import { CartService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class CartItemResolveGuard implements Resolve<ICartProduct> {
    constructor(
        private router: Router,
        private dialog: DialogService,
        private cartService: CartService,
    ) {}

    resolve(
        activeRouteSnapshot: ActivatedRouteSnapshot,
    ): Observable<ICartProduct | null> {
        if (!activeRouteSnapshot.paramMap.has(CartPath.ProductId)) {
            this.dialog.show({ message: `URL is wrong` });
            this.router.navigate([AppPath.Cart]);
            return of(null);
        }

        const productId = activeRouteSnapshot.paramMap.get(CartPath.ProductId);

        return of(this.cartService.getProduct(productId)).pipe(
            map((cartProduct: ICartProduct) => {
                if (cartProduct) {
                    return cartProduct;
                } else {
                    this.router.navigate([AppPath.Cart]);
                    return null;
                }
            }),
            take(1),
            catchError(() => {
                this.router.navigate([AppPath.Cart]);
                return of(null);
            }),
        );
    }
}
