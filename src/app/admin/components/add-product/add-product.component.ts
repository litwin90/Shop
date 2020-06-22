import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { ConfirmationService, AppPath } from '../../../shared';
import {
    Category,
    ProductColors,
    ProductSizes,
    ProductActions,
} from '../../../products';
import { ProductData } from '../../../products';
import { AdminPath } from '../../admin.constants';
import { IAppState } from '../../../app.state';

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
        private router: Router,
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
        this.router.navigate([AppPath.Admin, AdminPath.Products]);
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
