import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService, CartService, WithSubscriptions } from '../../../shared';
import { ProductService } from '../../services';
import { IProduct } from '../../models';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends WithSubscriptions implements OnInit {
    isLoggedIn = false;
    products: Observable<IProduct[]>;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.products = this.productService.getProducts();
        const initialAuthState$ = this.authService
            .getAuthState()
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            });
        const auth$ = this.authService.authSubject.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        });
        this.subscriptions.push(auth$, initialAuthState$);
    }

    addToCart(product: IProduct) {
        if (product.isAvailable) {
            this.cartService.addProduct(product);
        }
    }
}
