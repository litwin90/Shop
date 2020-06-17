import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { WithRouteData, ConfirmationService, AppPath } from '../../../shared';
import {
    ProductsService,
    Category,
    ProductColors,
    ProductSizes,
} from '../../../products';
import { ProductData } from '../../../products';
import { AdminPath } from '../../admin.constants';

@Component({
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent extends WithRouteData implements OnInit {
    productData: ProductData;
    initialProductSnapshot: string;

    ProductColors = ProductColors;
    ProductSizes = ProductSizes;
    Category = Category;

    constructor(
        private activeRoute: ActivatedRoute,
        private productService: ProductsService,
        private confirmation: ConfirmationService,
        private router: Router,
    ) {
        super(activeRoute);
    }

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
        this.productService.addProduct(this.productData).subscribe();
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
