import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IAppState } from '../../../app.state';
import { CartService } from '../../../cart';
import { RouterFacade } from '../../../router-state';
import { AuthService } from '../../../shared';
import { IProduct } from '../../models';
import { selectProductByUrl } from '../../state';

@Component({
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    product$: Observable<IProduct>;

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private store: Store<IAppState>,
        private routerFacade: RouterFacade,
    ) {}

    ngOnInit(): void {
        this.product$ = this.store.pipe(select(selectProductByUrl));

        const { isLoggedIn, userInfo } = this.authService.getAuthData();
        this.isLoggedIn = isLoggedIn;
        if (userInfo?.isAdmin) {
            this.isAdmin = true;
        }
    }

    onAddToCart(product: IProduct) {
        this.cartService.addProductToCart(product).subscribe(() => {
            this.routerFacade.goToProducts();
        });
    }

    getAvailabilityTitle(product: IProduct): string {
        return product.isAvailable ? 'Available' : 'Not Available';
    }

    getAddToCartTooltip(): string {
        return this.isLoggedIn ? 'Add to Cart' : 'Please Login First';
    }
}
