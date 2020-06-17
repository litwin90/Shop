import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap, delay, map, switchMap } from 'rxjs/operators';

import { IProduct, ProductData } from '../models';
import {
    SpinnerService,
    SnakeService,
    REQUESTS_DELAY,
    GeneratorService,
    ConfirmationService,
} from '../../shared';
import { environment } from '../../../environments/environment';
import { ProductsStateService } from './products-state.service';

@Injectable({
    providedIn: 'any',
})
export class ProductsService {
    constructor(
        private spinner: SpinnerService,
        private snake: SnakeService,
        private generator: GeneratorService,
        private confirmation: ConfirmationService,
        private httpClient: HttpClient,
        private productsState: ProductsStateService,
    ) {}

    getProducts(): Observable<IProduct[]> {
        return this.httpClient
            .get(`${environment.apiUrl}/${environment.apiProductsPrefix}`)
            .pipe(
                tap(() => this.spinner.show()),
                delay(REQUESTS_DELAY),
                map((response: IProduct[]) => {
                    this.productsState.setProducts(response);
                    return response;
                }),
                finalize(() => this.spinner.hide()),
            );
    }

    getProduct(id: string): Observable<IProduct | undefined> {
        return this.httpClient
            .get(`${environment.apiUrl}/${environment.apiProductsPrefix}/${id}`)
            .pipe(
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

    addProduct(data: ProductData): Observable<IProduct> {
        const newProduct = this.productsState.createProductFromProductData(
            data,
        );
        return this.httpClient
            .post(
                `${environment.apiUrl}/${environment.apiProductsPrefix}`,
                newProduct,
            )
            .pipe(
                tap(() => this.spinner.show()),
                delay(REQUESTS_DELAY),
                tap((product: IProduct) => {
                    if (!product) {
                        this.snake.show({
                            message: 'Unable to create product',
                        });
                    }
                }),
                finalize(() => {
                    this.spinner.hide();
                    this.productsState.addProduct(newProduct);
                }),
            );
    }

    updateProduct(productId: string, newProduct: IProduct) {
        return this.httpClient
            .put(
                `${environment.apiUrl}/${environment.apiProductsPrefix}/${productId}`,
                newProduct,
            )
            .pipe(
                tap(() => this.spinner.show()),
                delay(REQUESTS_DELAY),
                tap((product: IProduct) => {
                    if (!product) {
                        this.snake.show({
                            message: 'Unable to create product',
                        });
                    }
                }),
                finalize(() => {
                    this.spinner.hide();
                    this.productsState.updateProduct(productId, newProduct);
                }),
            );
    }

    removeProduct(productId: string) {
        return this.confirmation
            .askConfirmation({
                title: 'Remove product',
                message: 'Are you sure you want to remove product?',
            })
            .pipe(
                tap(() => this.spinner.show()),
                switchMap(isConfirmed => {
                    if (isConfirmed) {
                        return this.httpClient.delete(
                            `${environment.apiUrl}/${environment.apiProductsPrefix}/${productId}`,
                        );
                    }
                }),
                delay(REQUESTS_DELAY),
                finalize(() => {
                    this.spinner.hide();
                    this.productsState.removeProduct(productId);
                }),
            );
    }
}
