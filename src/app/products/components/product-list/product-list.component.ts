import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService, CartService, AppPaths } from '../../../shared';
import { ProductService } from '../../services';
import { IProduct } from '../../models';
import { startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { WithRouteData } from '../../../shared/classes/with-route-data';
import { AdminPath } from '../../../admin';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends WithRouteData implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    products: Observable<IProduct[]>;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private router: Router,
    ) {
        super(activeRoute);
    }

    ngOnInit(): void {
        this.products = this.productService.getProducts();
        const authData$ = this.authService.authSubject
            .pipe(startWith(this.authService.getAuthData()))
            .subscribe(({ isLoggedIn, userInfo }) => {
                this.isLoggedIn = isLoggedIn;
                this.isAdmin = userInfo?.isAdmin;
            });
        this.subscriptions.push(authData$);
    }

    addToCart(product: IProduct) {
        if (product.isAvailable) {
            this.cartService.addProduct(product);
        }
    }

    onAddNewProduct() {
        this.router.navigate([
            AppPaths.Admin,
            AdminPath.Product,
            AdminPath.Add,
        ]);
    }
}
