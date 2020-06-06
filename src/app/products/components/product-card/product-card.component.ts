import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppPaths, CartService, AuthService } from '../../../shared';
import { IProduct } from '../../models';
import { ProductService } from '../../services';

@Component({
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    isLoggedIn = false;
    product: IProduct;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        const routeSubscription = this.route.paramMap
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

        const initialAuthStateSubscription = this.authService
            .getAuthState()
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            });

        this.subscriptions.push(
            routeSubscription,
            initialAuthStateSubscription,
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.map(subscription => subscription.unsubscribe());
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
