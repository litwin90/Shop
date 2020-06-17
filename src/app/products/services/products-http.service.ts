import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IProduct } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'any',
})
export class ProductsHttpService {
    constructor(private httpClient: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>(
            `${environment.apiUrl}/${environment.apiProductsPrefix}`,
        );
    }

    getProduct(id: string): Observable<IProduct> {
        return this.httpClient.get<IProduct>(
            `${environment.apiUrl}/${environment.apiProductsPrefix}/${id}`,
        );
    }

    addProduct(product: Omit<IProduct, 'id'>): Observable<IProduct> {
        return this.httpClient.post<IProduct>(
            `${environment.apiUrl}/${environment.apiProductsPrefix}`,
            product,
        );
    }

    updateProduct(productId: string, newProduct: IProduct) {
        return this.httpClient.put<IProduct>(
            `${environment.apiUrl}/${environment.apiProductsPrefix}/${productId}`,
            newProduct,
        );
    }

    removeProduct(productId: string) {
        return this.httpClient.delete(
            `${environment.apiUrl}/${environment.apiProductsPrefix}/${productId}`,
        );
    }
}
