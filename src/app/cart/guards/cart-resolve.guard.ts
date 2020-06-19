import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Observable, zip, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICartData } from '../models';
import {
    AppPath,
    DialogService,
    AuthService,
    AppSettingsService,
} from '../../shared';
import { CartService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class CartResolveGuard implements Resolve<ICartData> {
    constructor(
        private cartService: CartService,
        private router: Router,
        private dialog: DialogService,
        private authService: AuthService,
        private settings: AppSettingsService,
    ) {}

    resolve(): Observable<ICartData> {
        return zip(
            this.cartService.getProducts(),
            this.cartService.getCartInfo(),
            of(this.authService.getAuthData()),
            this.settings.get(),
        ).pipe(
            map(([products, info, { userInfo }, { cart: cartSettings }]) => {
                if (products && info && cartSettings) {
                    if (!products.length) {
                        if (userInfo?.isAdmin) {
                            this.dialog.show({
                                message: `you are admin. admins might not have cart items`,
                            });
                            this.router.navigate([AppPath.Admin]);
                        } else {
                            this.dialog.show({
                                message: `you don't have any products in cart yet`,
                            });
                            this.router.navigate([AppPath.ProductsList]);
                        }
                    }
                    return { products, info, settings: cartSettings };
                } else {
                    this.router.navigate([AppPath.ProductsList]);
                    return null;
                }
            }),
        );
    }
}
