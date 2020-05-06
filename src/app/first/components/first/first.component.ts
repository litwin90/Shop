import { Component, OnInit } from '@angular/core';

import { Category, ProductColors, ProductSizes } from '../../first.models';

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
    styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
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
}
