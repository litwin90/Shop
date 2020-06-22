import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { AppPath, AuthService, WithSubscriptions } from '../../../shared';
import { IProduct } from '../../models';
import { CartService } from '../../../cart';

@Component({
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends WithSubscriptions
    implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    product: IProduct;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private cartService: CartService,
        private authService: AuthService,
    ) {
        super();
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
        this.cartService.addProductToCart(this.product).subscribe(() => {
            this.router.navigate([AppPath.ProductsList]);
        });
    }

    getAvailabilityTitle(): string {
        return this.product.isAvailable ? 'Available' : 'Not Available';
    }

    getAddToCartTooltip(): string {
        return this.isLoggedIn ? 'Add to Cart' : 'Please Login First';
    }
}
