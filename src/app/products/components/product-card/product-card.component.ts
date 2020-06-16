import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { pluck } from 'rxjs/operators';

import {
    AppPaths,
    CartService,
    AuthService,
    WithRouteData,
} from '../../../shared';
import { IProduct } from '../../models';

@Component({
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent extends WithRouteData implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    product: IProduct;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private cartService: CartService,
        private authService: AuthService,
    ) {
        super(activeRoute);
    }

    ngOnInit(): void {
        const activeRoute$ = this.activeRoute.data
            .pipe(pluck('product'))
            .subscribe((product: IProduct) => {
                this.product = { ...product };
            });
        const { isLoggedIn, userInfo } = this.authService.getAuthData();
        this.isLoggedIn = isLoggedIn;
        if (userInfo?.isAdmin) {
            this.isAdmin = true;
        }
        this.subscriptions.push(activeRoute$);
    }

    onAddToCart() {
        this.cartService.addProduct(this.product);
        this.router.navigate([AppPaths.ProductsList]);
    }

    getAvailabilityTitle(): string {
        return this.product.isAvailable ? 'Available' : 'Not Available';
    }

    getAddToCartTooltip(): string {
        return this.isLoggedIn ? 'Add to Cart' : 'Please Login First';
    }
}
