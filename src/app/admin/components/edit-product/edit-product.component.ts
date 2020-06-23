import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { of } from 'rxjs';

import { IAppState } from '../../../app.state';
import {
    Category, IProduct, ProductActions, ProductColors, ProductSizes, selectProductByUrl
} from '../../../products';
import { RouterActions } from '../../../router-state';
import { ConfirmationService, WithSubscriptions } from '../../../shared';

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
        private store: Store<IAppState>,
    ) {
        super();
    }

    ngOnInit(): void {
        const product$ = this.store
            .pipe(select(selectProductByUrl))
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
        this.store.dispatch(
            ProductActions.updateProduct({
                id: this.product.id,
                product: this.product,
            }),
        );
        this.initialProductSnapshot = JSON.stringify(this.product);
        this.store.dispatch(RouterActions.goToProducts());
    }

    canDeactivate() {
        return this.isProductChanged()
            ? this.confirmation.ask({
                  message:
                      'Are you sure you want to leave this page? All data will be lost',
              })
            : of(true);
    }
}
