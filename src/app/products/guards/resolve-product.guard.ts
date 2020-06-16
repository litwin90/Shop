import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { finalize, tap, delay } from 'rxjs/operators';

import { IProduct } from '../models';
import { ProductService } from '../services';
import { SpinnerService, REQUESTS_DELAY } from '../../shared';

@Injectable({
    providedIn: 'any',
})
export class ResolveProductGuard implements Resolve<IProduct> {
    constructor(
        private router: Router,
        private productService: ProductService,
        private spinner: SpinnerService,
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IProduct | null> {
        const productId = route.paramMap.get('id');

        if (!productId) {
            return of(null);
        }

        return this.productService.getProduct(productId).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            finalize(() => this.spinner.hide()),
        );
    }
}
