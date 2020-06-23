import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { IAppState } from '../../../app.state';
import {
    Category, ProductActions, ProductColors, ProductData, ProductSizes
} from '../../../products';
import { RouterActions } from '../../../router-state';
import { ConfirmationService } from '../../../shared';

@Component({
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    productData: ProductData;
    initialProductSnapshot: string;

    ProductColors = ProductColors;
    ProductSizes = ProductSizes;
    Category = Category;

    constructor(
        private confirmation: ConfirmationService,
        private store: Store<IAppState>,
    ) {}

    ngOnInit(): void {
        this.productData = {
            name: 'New Product',
            description: 'Some description',
            price: 100,
            category: Category.Primary,
            isAvailable: true,
            colors: [],
            sizes: [],
        };
        this.initialProductSnapshot = JSON.stringify(this.productData);
    }

    isProductChanged(): boolean {
        return JSON.stringify(this.productData) !== this.initialProductSnapshot;
    }

    onSave() {
        this.store.dispatch(
            ProductActions.addProduct({
                product: {
                    ...this.productData,
                    updateDate: Date.now(),
                },
            }),
        );
        this.initialProductSnapshot = JSON.stringify(this.productData);
        this.store.dispatch(RouterActions.goToProducts());
    }

    canDeactivate(): Observable<boolean> {
        return this.isProductChanged()
            ? this.confirmation.ask({
                  message:
                      'Are you sure you want to leave this page? All data will be lost',
              })
            : of(true);
    }
}
