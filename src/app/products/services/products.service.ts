import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { IProduct, ProductData } from '../models';
import { ConfirmationService } from '../../shared';
import { ProductsHttpService } from './products-http.service';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private products: IProduct[] = [];

    productsSubject: Subject<IProduct[]> = new Subject();

    constructor(
        private productsHttp: ProductsHttpService,
        private confirmation: ConfirmationService,
    ) {
        this.productsHttp.getProducts().subscribe(products => {
            this.products = products;
            this.updateProducts();
        });
    }

    getProducts(): Observable<IProduct[]> {
        return this.productsHttp.getProducts();
    }

    getProduct(id: string) {
        return this.productsHttp.getProduct(id);
    }

    addProduct(productData: ProductData) {
        return this.productsHttp
            .addProduct(this.applyDateToNewProduct(productData))
            .pipe(
                tap(product => {
                    this.products.push(product);
                    this.updateProducts();
                }),
            );
    }

    updateProduct(productId: string, newProduct: IProduct) {
        return this.productsHttp.updateProduct(productId, newProduct).pipe(
            tap(product => {
                this.products = this.products.filter(
                    ({ id }) => product.id !== id,
                );
                this.products.push(product);
                this.updateProducts();
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
                        return this.productsHttp.removeProduct(productId).pipe(
                            tap(() => {
                                this.products = this.products.filter(
                                    ({ id }) => id !== productId,
                                );
                                this.updateProducts();
                            }),
                        );
                    }
                }),
            );
    }

    private updateProducts() {
        this.productsSubject.next(this.products);
    }

    private applyDateToNewProduct(productData: ProductData) {
        return {
            ...productData,
            updateDate: Date.now(),
        };
    }
}
