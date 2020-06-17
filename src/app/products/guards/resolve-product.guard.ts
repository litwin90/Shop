import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { IProduct } from '../models';
import { ProductsService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class ResolveProductGuard implements Resolve<IProduct> {
    constructor(private productService: ProductsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IProduct | null> {
        const productId = route.paramMap.get('id');

        if (!productId) {
            return of(null);
        }

        return this.productService.getProduct(productId);
    }
}
