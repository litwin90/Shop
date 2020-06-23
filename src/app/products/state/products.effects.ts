import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ProductsHttpService } from '../../products/services';
import { ProductActions } from './products.actions';

@Injectable()
export class ProductsEffects {
    constructor(
        private actions$: Actions,
        private productsHttp: ProductsHttpService,
    ) {}

    getProducts$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.getProducts),
            switchMap(() =>
                this.productsHttp.getProducts().pipe(
                    map(products =>
                        ProductActions.getProductsSuccess({ products }),
                    ),
                    catchError(() => of(ProductActions.getProductsError())),
                ),
            ),
        ),
    );

    addProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            switchMap(({ product }) =>
                this.productsHttp.addProduct(product).pipe(
                    map(newProduct =>
                        ProductActions.addProductSuccess({
                            product: newProduct,
                        }),
                    ),
                    catchError(() => of(ProductActions.addProductError())),
                ),
            ),
        ),
    );

    updateProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            switchMap(({ product }) =>
                this.productsHttp.updateProduct(product.id, product).pipe(
                    map(newProduct =>
                        ProductActions.updateProductSuccess({
                            product: newProduct,
                        }),
                    ),
                    catchError(() => of(ProductActions.updateProductError())),
                ),
            ),
        ),
    );

    removeProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.removeProduct),
            switchMap(({ id }) =>
                this.productsHttp.removeProduct(id).pipe(
                    map(() =>
                        ProductActions.removeProductSuccess({
                            id,
                        }),
                    ),
                    catchError(() => of(ProductActions.removeProductError())),
                ),
            ),
        ),
    );
}
