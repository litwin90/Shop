import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { IProduct, ProductData } from '../models';
import { GeneratorService } from '../../shared';

@Injectable({
    providedIn: 'root',
})
export class ProductsStateService {
    private products: IProduct[] = [];

    productsSubject: Subject<IProduct[]> = new Subject();

    constructor(private generator: GeneratorService) {
        this.pushNewSubjectEvent();
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    setProducts(products: IProduct[]) {
        this.products = products;
        this.pushNewSubjectEvent();
    }

    createProductFromProductData(productData: ProductData): IProduct {
        return {
            ...productData,
            id: this.generator.getRandomString(10),
            updateDate: Date.now(),
        };
    }

    addProduct(productData: ProductData) {
        this.products.push(this.createProductFromProductData(productData));
        this.pushNewSubjectEvent();
    }

    updateProduct(productId: string, newProduct: IProduct) {
        const indefOfOldProduct = this.products.findIndex(
            ({ id }) => id === productId,
        );
        this.products[indefOfOldProduct] = newProduct;
        this.pushNewSubjectEvent();
    }

    removeProduct(productId: string) {
        this.products = this.products.filter(({ id }) => id !== productId);
        this.pushNewSubjectEvent();
    }

    private pushNewSubjectEvent() {
        this.productsSubject.next(this.products);
    }
}
