import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IAppState } from '../../app.state';
import { RouterActions } from '../../router-state';
import { DialogService } from '../../shared';
import { CartPath } from '../cart.constants';
import { ICartProduct } from '../models';
import { CartService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class ResolveCartItemGuard implements Resolve<ICartProduct> {
    constructor(
        private dialog: DialogService,
        private cartService: CartService,
        private store: Store<IAppState>,
    ) {}

    resolve(
        activeRouteSnapshot: ActivatedRouteSnapshot,
    ): Observable<ICartProduct | null> {
        if (!activeRouteSnapshot.paramMap.has(CartPath.ProductId)) {
            this.dialog.show({ message: `URL is wrong` });
            this.store.dispatch(RouterActions.goToCart());
            return of(null);
        }

        const productId = activeRouteSnapshot.paramMap.get(CartPath.ProductId);

        return of(this.cartService.getProduct(productId)).pipe(
            map((cartProduct: ICartProduct) => {
                if (cartProduct) {
                    return cartProduct;
                } else {
                    this.store.dispatch(RouterActions.goToCart());
                    return null;
                }
            }),
            take(1),
        );
    }
}
