import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouterFacade } from '../../router-state';
import { AppSettingsService, AuthService, DialogService } from '../../shared';
import { ICartData } from '../models';
import { CartService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class ResolveCartGuard implements Resolve<ICartData> {
    constructor(
        private cartService: CartService,
        private dialog: DialogService,
        private authService: AuthService,
        private settings: AppSettingsService,
        private routerFacade: RouterFacade,
    ) {}

    resolve(): Observable<ICartData> {
        return zip(
            of(this.cartService.getProducts()),
            of(this.cartService.getCartInfo()),
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
                            this.routerFacade.goToAdmin();
                        } else {
                            this.dialog.show({
                                message: `you don't have any products in cart yet`,
                            });
                            this.routerFacade.goToProducts();
                        }
                    }
                    return { products, info, settings: cartSettings };
                } else {
                    this.routerFacade.goToProducts();
                    return null;
                }
            }),
        );
    }
}
