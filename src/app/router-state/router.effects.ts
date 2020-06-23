import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import { AdminPath } from '../admin/admin.constants';
import { OrdersPath } from '../orders/orders.constants';
import { AppPath } from '../shared/shared.constants';
import { RouterActions } from './router.actions';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location,
    ) {}

    navigate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.go),
                map(action => {
                    const { type: deleted, path, queryParams, extras } = {
                        ...action,
                    };
                    return { path, queryParams, extras };
                }),
                tap(({ path, queryParams, extras }) => {
                    this.router.navigate(path, { queryParams, ...extras });
                }),
            ),
        { dispatch: false },
    );

    navigateBack$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.back),
                tap(() => this.location.back()),
            ),
        { dispatch: false },
    );

    navigateForward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.forward),
                tap(() => this.location.forward()),
            ),
        { dispatch: false },
    );

    // ADMIN:
    navigateToAdmin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToAdmin),
                tap(() => this.router.navigate([AppPath.Admin])),
            ),
        { dispatch: false },
    );

    navigateToAdminProducts$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToAdminProducts),
                tap(() =>
                    this.router.navigate([AppPath.Admin, AdminPath.Products]),
                ),
            ),
        { dispatch: false },
    );

    navigateToEditProduct$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToEditProduct),
                tap(({ id }) =>
                    this.router.navigate([
                        AppPath.Admin,
                        AdminPath.Product,
                        AdminPath.Edit,
                        id,
                    ]),
                ),
            ),
        { dispatch: false },
    );

    navigateToAddProduct$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToAddProduct),
                tap(() =>
                    this.router.navigate([
                        AppPath.Admin,
                        AdminPath.Product,
                        AdminPath.Add,
                    ]),
                ),
            ),
        { dispatch: false },
    );

    // PRODUCTS:
    navigateToProducts$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToProducts),
                tap(() => this.router.navigate([AppPath.ProductsList])),
            ),
        { dispatch: false },
    );

    navigateToProductDetails$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToProductDetails),
                tap(({ id }) => this.router.navigate([AppPath.Product, id])),
            ),
        { dispatch: false },
    );

    // CART:
    navigateToCart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToCart),
                tap(() => this.router.navigate([AppPath.Cart])),
            ),
        { dispatch: false },
    );

    navigateToEditCartProduct$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToEditCartProduct),
                tap(({ id }) =>
                    this.router.navigate([AppPath.Cart, AppPath.Edit, id]),
                ),
            ),
        { dispatch: false },
    );

    // ORDERS:
    navigateToOrders$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToOrders),
                tap(() => this.router.navigate([AppPath.Orders])),
            ),
        { dispatch: false },
    );

    navigateToCreateOrders$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToOrderCreate),
                tap(() =>
                    this.router.navigate([AppPath.Orders, OrdersPath.Create]),
                ),
            ),
        { dispatch: false },
    );

    navigateToEditOrder$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToEditOrder),
                tap(({ id }) =>
                    this.router.navigate([AppPath.Orders, OrdersPath.Edit, id]),
                ),
            ),
        { dispatch: false },
    );

    navigateToOrderDetails$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.goToOrderDetails),
                tap(({ id }) =>
                    this.router.navigate([
                        AppPath.Orders,
                        OrdersPath.OrderDetails,
                        id,
                    ]),
                ),
            ),
        { dispatch: false },
    );
}
