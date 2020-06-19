import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { IProduct } from '../models';
import { ProductsService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class ResolveProductGuard implements Resolve<IProduct> {
    constructor(private productService: ProductsService) {}

    resolve(route: ActivatedRouteSnapshot): IProduct {
        const productId = route.paramMap.get('id');

        if (!productId) {
            return null;
        }

        return this.productService.getProduct(productId);
    }
}
