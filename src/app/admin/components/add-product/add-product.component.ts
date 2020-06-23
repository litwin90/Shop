import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import {
    Category, ProductColors, ProductData, ProductSizes, ProductsService
} from '../../../products';
import { RouterFacade } from '../../../router-state';
import { ConfirmationService, GeneratorService } from '../../../shared';

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
        private routerFacade: RouterFacade,
        private generator: GeneratorService,
        private productService: ProductsService,
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
        this.productService.add({
            ...this.productData,
            updateDate: Date.now(),
            id: this.generator.getRandomString(10),
        });
        this.initialProductSnapshot = JSON.stringify(this.productData);
        this.routerFacade.goToAdminProducts();
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
