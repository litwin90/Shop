import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IAppState } from '../../../app.state';
import { CartService } from '../../../cart';
import { RouterActions } from '../../../router-state';
import { AuthService, WithSubscriptions } from '../../../shared';
import { IProduct } from '../../models';
import { ProductActions, selectProducts } from '../../state';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends WithSubscriptions implements OnInit {
    productsState$: Observable<readonly IProduct[]>;
    isLoggedIn = false;
    isAdmin = false;

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private store: Store<IAppState>,
        private router: Router,
    ) {
        super();
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
        this.store.dispatch(RouterActions.goToAddProduct());
    }

    onRemoveProduct({ id }: IProduct) {
        this.store.dispatch(ProductActions.removeProduct({ id }));
    }

    onOpenDetails({ id }: IProduct) {
        this.store.dispatch(RouterActions.goToProductDetails({ id }));
    }

    onEditProduct({ id }: IProduct) {
        this.store.dispatch(RouterActions.goToEditProduct({ id }));
    }
}
