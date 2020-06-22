import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { IProduct } from '../models';
import { ProductsHttpService } from '../services';

@Injectable({
    providedIn: 'any',
})
export class ResolveProductGuard implements Resolve<IProduct> {
    constructor(private productHttp: ProductsHttpService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
        const productId = route.paramMap.get('id');

        if (!productId) {
            return null;
        }

        return this.productHttp.getProduct(productId);
    }
}
