import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const RouterActions = {
    forward: createAction('[Router] FORWARD'),
    back: createAction('[Router] BACK'),
    go: createAction(
        '[Router] GO',
        props<{
            path: any[];
            queryParams?: object;
            extras?: NavigationExtras;
        }>(),
    ),

    // ADMIN:
    goToAdmin: createAction('[Router] GO TO ADMIN'),
    goToAdminProducts: createAction('[Router] GO TO ADMIN PRODUCTS'),
    goToAdminOrders: createAction('[Router] GO TO ADMIN ORDERS'),

    // PRODUCTS:
    goToProducts: createAction('[Router] GO TO PRODUCTS'),
    goToAddProduct: createAction('[Router] GO TO ADD PRODUCT'),
    goToProductDetails: createAction(
        '[Router] GO TO PRODUCT DETAILS',
        props<{
            id: string;
        }>(),
    ),
    goToEditProduct: createAction(
        '[Router] GO TO EDIT PRODUCT',
        props<{
            id: string;
        }>(),
    ),

    // CART:
    goToCart: createAction('[Router] GO TO CART'),
    goToEditCartProduct: createAction(
        '[Router] GO TO EDIT CART PRODUCT',
        props<{
            id: string;
        }>(),
    ),

    // ORDERS:
    goToOrders: createAction('[Router] GO TO ORDERS'),
    goToOrderCreate: createAction('[Router] GO TO ORDER CREATE'),
    goToEditOrder: createAction(
        '[Router] GO TO EDIT ORDER',
        props<{
            id: string;
        }>(),
    ),
    goToOrderDetails: createAction(
        '[Router] GO TO ORDER DETAILS',
        props<{
            id: string;
        }>(),
    ),
};
