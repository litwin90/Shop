import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AuthService, AppPath, WithRouteData } from '../../../shared';
import { IProduct } from '../../models';
import { AdminPath } from '../../../admin';
import { CartService } from '../../../cart';
import { ProductActions, selectProducts } from '../../state';
import { IAppState } from '../../../app.state';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends WithRouteData implements OnInit {
    productsState$: Observable<readonly IProduct[]>;
    isLoggedIn = false;
    isAdmin = false;

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private store: Store<IAppState>,
    ) {
        super(activeRoute);
    }

    ngOnInit(): void {
        this.store.dispatch(ProductActions.getProducts());
        this.productsState$ = this.store.pipe(select(selectProducts));
        const authData$ = this.authService.authSubject.subscribe(
            ({ isLoggedIn, userInfo }) => {
                this.isLoggedIn = isLoggedIn;
                this.isAdmin = userInfo?.isAdmin;
            },
        );
        this.subscriptions.push(authData$);
    }

    onAddToCart(product: IProduct) {
        if (product.isAvailable) {
            this.cartService.addProductToCart(product).subscribe();
        }
    }

    onAddNewProduct() {
        this.router.navigate([AppPath.Admin, AdminPath.Product, AdminPath.Add]);
    }

    onRemoveProduct({ id }: IProduct) {
        this.store.dispatch(ProductActions.removeProduct({ id }));
    }

    onOpenDetails(product: IProduct) {
        this.router.navigate([AppPath.Product, product.id]);
    }

    onEditProduct(product: IProduct) {
        this.router.navigate([
            AppPath.Admin,
            AdminPath.Product,
            AdminPath.Edit,
            product.id,
        ]);
    }
}
