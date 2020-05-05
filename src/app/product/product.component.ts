import { Component, OnInit } from '@angular/core';

import { Category, ProductSizes, ProductColors } from './product.models';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;

    colors: ProductColors[];
    sizes: ProductSizes[];

    ngOnInit(): void {
        this.name = 'Some Product';
        this.description = 'There should be a product description';
        this.price = 100;
        this.category = Category.Primary;
        this.isAvailable = true;

        this.colors = [ProductColors.Blue, ProductColors.Red];
        this.sizes = [ProductSizes.L, ProductSizes.M, ProductSizes.S];
    }

    onBuy() {
        console.log('Product is bought');
    }
}
