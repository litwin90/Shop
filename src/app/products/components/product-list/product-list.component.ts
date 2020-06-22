import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, AppPath, WithRouteData } from '../../../shared';
import { ProductsService } from '../../services';
import { IProduct } from '../../models';
import { AdminPath } from '../../../admin';
import { CartService } from '../../../cart';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends WithRouteData implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    products: IProduct[];

    constructor(
        private productsService: ProductsService,
        private cartService: CartService,
        private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private router: Router,
    ) {
        super(activeRoute);
    }

    ngOnInit(): void {
        const products$ = this.productsService.productsSubject.subscribe(
            products => {
                this.products = products;
            },
        );
        const authData$ = this.authService.authSubject.subscribe(
            ({ isLoggedIn, userInfo }) => {
                this.isLoggedIn = isLoggedIn;
                this.isAdmin = userInfo?.isAdmin;
            },
        );
        this.subscriptions.push(authData$, products$);
    }

    addToCart(product: IProduct) {
        if (product.isAvailable) {
            this.cartService.addProductToCart(product).subscribe();
        }
    }

    onAddNewProduct() {
        this.router.navigate([AppPath.Admin, AdminPath.Product, AdminPath.Add]);
    }
}
