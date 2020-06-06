import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthService, CartService } from '../../../shared';
import { ProductService } from '../../services';
import { IProduct } from '../../models';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    isLoggedIn = false;
    products: Observable<IProduct[]>;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.products = this.productService.getProducts();
        const initialAuthStateSubscription = this.authService
            .getAuthState()
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            });
        const authSubscription = this.authService.authSubject.subscribe(
            isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            },
        );
        this.subscriptions.push(authSubscription, initialAuthStateSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.map(subscription => subscription.unsubscribe());
    }

    addToCart(product: IProduct) {
        if (product.isAvailable) {
            this.cartService.addProduct(product);
        }
    }
}
