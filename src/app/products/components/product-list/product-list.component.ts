import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CartService } from '../../../cart';
import { AuthService, WithSubscriptions } from '../../../shared';
import { RouterFacade } from '../../../state';
import { ProductsService } from '../../../state/products';
import { IProduct } from '../../models';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends WithSubscriptions implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    products$: Observable<IProduct[]>;

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private routerFacade: RouterFacade,
        private productService: ProductsService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.products$ = this.productService.entities$;
        this.productService.getAll();
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
        this.routerFacade.goToAddProduct();
    }

    onRemoveProduct(product: IProduct) {
        this.productService.delete(product);
    }

    onOpenDetails({ id }: IProduct) {
        this.routerFacade.goToProductDetails(id);
    }

    onEditProduct({ id }: IProduct) {
        this.routerFacade.goToEditProduct(id);
    }
}
