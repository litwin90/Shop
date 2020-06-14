import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {
    AppPaths,
    CartService,
    AuthService,
    WithSubscriptions,
} from '../../../shared';
import { IProduct } from '../../models';
import { ProductService } from '../../services';

@Component({
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent extends WithSubscriptions implements OnInit {
    isLoggedIn = false;
    product: IProduct;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        const activeRoute$ = this.activeRoute.paramMap
            .pipe(
                switchMap((params: ParamMap) =>
                    this.productService.getProduct(params.get('id')),
                ),
            )
            .subscribe({
                next: (product: IProduct) => {
                    this.product = { ...product };
                },
                error: (err: any) => {
                    console.log(err);
                },
            });

        const initialAuthState$ = this.authService
            .getAuthState()
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            });

        this.subscriptions.push(activeRoute$, initialAuthState$);
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
