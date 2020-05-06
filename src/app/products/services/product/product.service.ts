import { Injectable } from '@angular/core';

import { IProduct, Category, ProductColors, ProductSizes } from '../../models/product.models';

export const PRODUCTS: IProduct[] = [
    {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
        category: Category.Primary,
        isAvailable: true,
        colors: [ProductColors.Blue, ProductColors.Red],
        sizes: [ProductSizes.L, ProductSizes.M, ProductSizes.S],
    },
    {
        name: 'Product 2',
        description: 'Product 2 description',
        price: 100,
        category: Category.Primary,
        isAvailable: true,
        colors: [ProductColors.Blue, ProductColors.Red],
        sizes: [ProductSizes.L, ProductSizes.M, ProductSizes.S],
    },
    {
        name: 'Product 3',
        description: 'Product 3 description',
        price: 100,
        category: Category.Primary,
        isAvailable: true,
        colors: [ProductColors.Blue, ProductColors.Red],
        sizes: [ProductSizes.L, ProductSizes.M, ProductSizes.S],
    },
];

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor() {}

    getProducts(): IProduct[] {
        return PRODUCTS;
    }
}
