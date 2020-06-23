import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';

import { IAppState } from '../app.state';
import { RouterActions } from './router.actions';

@Injectable({
    providedIn: 'root',
})
export class RouterFacade {
    constructor(private store: Store<IAppState>) {}

    forward() {
        this.store.dispatch(RouterActions.forward());
    }

    back() {
        this.store.dispatch(RouterActions.back());
    }

    go(params: {
        path: any[];
        queryParams?: object;
        extras?: NavigationExtras;
    }) {
        this.store.dispatch(RouterActions.go(params));
    }

    // ADMIN
    goToAdmin() {
        this.store.dispatch(RouterActions.goToAdmin());
    }

    goToAdminProducts() {
        this.store.dispatch(RouterActions.goToAdminProducts());
    }

    goToAdminOrders() {
        this.store.dispatch(RouterActions.goToAdminOrders());
    }

    // PRODUCTS
    goToProducts() {
        this.store.dispatch(RouterActions.goToProducts());
    }

    goToAddProduct() {
        this.store.dispatch(RouterActions.goToAddProduct());
    }

    goToProductDetails(id: string) {
        this.store.dispatch(RouterActions.goToProductDetails({ id }));
    }

    goToEditProduct(id: string) {
        this.store.dispatch(RouterActions.goToEditProduct({ id }));
    }

    // CART
    goToCart() {
        this.store.dispatch(RouterActions.goToCart());
    }

    goToEditCartProduct(id: string) {
        this.store.dispatch(RouterActions.goToEditCartProduct({ id }));
    }

    // ORDERS
    goToOrders() {
        this.store.dispatch(RouterActions.goToOrders());
    }

    goToOrderCreate() {
        this.store.dispatch(RouterActions.goToOrderCreate());
    }

    goToEditOrder(id: string) {
        this.store.dispatch(RouterActions.goToEditOrder({ id }));
    }

    goToOrderDetails(id: string) {
        this.store.dispatch(RouterActions.goToOrderDetails({ id }));
    }
}
