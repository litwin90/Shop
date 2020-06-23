import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';

import {
    AppPath,
    ConfirmationService,
    WithSubscriptions,
} from '../../../shared';
import {
    IProduct,
    ProductColors,
    ProductSizes,
    Category,
    ProductActions,
    selectProductByUrl,
} from '../../../products';
import { AdminPath } from '../../admin.constants';
import { IAppState } from '../../../app.state';

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
        private router: Router,
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
        this.router.navigate([AppPath.Admin, AdminPath.Products]);
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
