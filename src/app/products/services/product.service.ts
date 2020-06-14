import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IProduct, Category, ProductColors, ProductSizes } from '../models';
import { SpinnerService, SnakeService, REQUESTS_DELAY } from '../../shared';
import { finalize, tap, delay } from 'rxjs/operators';

export const PRODUCTS: IProduct[] = [
    {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
        category: Category.Primary,
        isAvailable: true,
        colors: [ProductColors.Blue, ProductColors.Red],
        sizes: [ProductSizes.L, ProductSizes.M, ProductSizes.S],
        updateDate: 1590076699063,
    },
    {
        id: '2',
        name: 'Product 2',
        description: 'Product 2 description',
        price: 150,
        category: Category.Primary,
        isAvailable: true,
        colors: [ProductColors.Blue, ProductColors.Red],
        sizes: [ProductSizes.L, ProductSizes.M, ProductSizes.S],
        updateDate: 1590076699063,
    },
    {
        id: '3',
        name: 'Product 3',
        description: 'Product 3 description',
        price: 300,
        category: Category.Primary,
        isAvailable: true,
        colors: [ProductColors.Blue, ProductColors.Red],
        sizes: [ProductSizes.L, ProductSizes.M, ProductSizes.S],
        updateDate: 1590076699063,
    },
    {
        id: '4',
        name: 'Product 4',
        description: 'Product 4 description',
        price: 350,
        category: Category.Primary,
        isAvailable: true,
        colors: [ProductColors.Blue, ProductColors.Red],
        sizes: [ProductSizes.L, ProductSizes.M, ProductSizes.S],
        updateDate: 1590076699063,
    },
];

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private spinner: SpinnerService, private snake: SnakeService) {}

    getProducts(): Observable<IProduct[]> {
        return of(PRODUCTS).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            finalize(() => {
                this.spinner.hide();
            }),
        );
    }

    getProduct(id: string): Observable<IProduct | undefined> {
        return of(PRODUCTS.find(product => product.id === id)).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            tap((product: IProduct) => {
                if (!product) {
                    this.snake.show({ message: 'Unable to get product' });
                }
            }),
            finalize(() => {
                this.spinner.hide();
            }),
        );
    }
}
