import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import { Category, IProduct, ProductColors, ProductSizes } from '../../../products';
import { ConfirmationService, WithSubscriptions } from '../../../shared';
import { IAppState, RouterFacade } from '../../../state';
import { ProductsService, selectProductByUrl } from '../../../state/products';

@Component({
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent extends WithSubscriptions implements OnInit {
    product: IProduct;
    initialProductSnapshot: string;

    ProductColors = ProductColors;
    ProductSizes = ProductSizes;
    Category = Category;

    constructor(
        private confirmation: ConfirmationService,
        private routerFacade: RouterFacade,
        private productsService: ProductsService,
        private store: Store<IAppState>,
    ) {
        super();
    }

    ngOnInit(): void {
        const product$ = this.store
            .pipe(select(selectProductByUrl), take(1))
            .subscribe(product => {
                if (!this.initialProductSnapshot) {
                    this.initialProductSnapshot = JSON.stringify(product);
                }
                this.product = { ...product };
            });
        this.subscriptions.push(product$);
    }

    isProductChanged(): boolean {
        return JSON.stringify(this.product) !== this.initialProductSnapshot;
    }

    onSave() {
        this.initialProductSnapshot = JSON.stringify(this.product);
        this.productsService.update(this.product);
        this.routerFacade.goToProducts();
    }

    canDeactivate() {
        return this.isProductChanged
            ? this.confirmation.ask({
                  message:
                      'Are you sure you want to leave this page? All data will be lost',
              })
            : of(true);
    }
}
