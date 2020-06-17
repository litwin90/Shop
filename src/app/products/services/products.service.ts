import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap, switchMap } from 'rxjs/operators';

import { IProduct, ProductData } from '../models';
import { DialogService, ConfirmationService } from '../../shared';
import { environment } from '../../../environments/environment';
import { ProductsStateService } from './products-state.service';

@Injectable({
    providedIn: 'any',
})
export class ProductsService {
    constructor(
        private dialog: DialogService,
        private confirmation: ConfirmationService,
        private httpClient: HttpClient,
        private productsState: ProductsStateService,
    ) {}

    getProducts(): Observable<IProduct[]> {
        return this.httpClient
            .get(`${environment.apiUrl}/${environment.apiProductsPrefix}`)
            .pipe(
                tap((response: IProduct[]) => {
                    this.productsState.setProducts(response);
                    return response;
                }),
            );
    }

    getProduct(id: string): Observable<IProduct | undefined> {
        return this.httpClient
            .get(`${environment.apiUrl}/${environment.apiProductsPrefix}/${id}`)
            .pipe(
                tap((product: IProduct) => {
                    if (!product) {
                        this.dialog.show({ message: 'Unable to get product' });
                    }
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
                tap((product: IProduct) => {
                    if (!product) {
                        this.dialog.show({
                            message: 'Unable to create product',
                        });
                    }
                }),
                finalize(() => {
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
                tap((product: IProduct) => {
                    if (!product) {
                        this.dialog.show({
                            message: 'Unable to create product',
                        });
                    }
                }),
                finalize(() => {
                    this.productsState.updateProduct(productId, newProduct);
                }),
            );
    }

    removeProduct(productId: string) {
        return this.confirmation
            .ask({
                title: 'Remove product',
                message: 'Are you sure you want to remove product?',
            })
            .pipe(
                switchMap(isConfirmed => {
                    if (isConfirmed) {
                        return this.httpClient.delete(
                            `${environment.apiUrl}/${environment.apiProductsPrefix}/${productId}`,
                        );
                    }
                }),
                finalize(() => {
                    this.productsState.removeProduct(productId);
                }),
            );
    }
}
