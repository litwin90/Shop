import { Injectable } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { IProduct } from '../../../products/models/product.models';
import { ICartProduct } from '../../../cart/models/cart-product';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private products: ICartProduct[] = [];

    public productsSubject = new Subject<ICartProduct[]>();

    constructor() {
        this.productsSubject.next(this.products);
    }

    addProduct(product: IProduct) {
        const cartProduct = this.products.find(productInCart => productInCart.id === product.id);
        if (cartProduct) {
            this.increaseQuantity(cartProduct);
        } else {
            this.products.push({
                id: product.id,
                name: product.name,
                cost: product.price,
                quantity: 1,
            });
        }
        this.productsSubject.next(this.products);
    }

    removeProduct(product: ICartProduct) {
        this.products = this.products.filter(productInCart => productInCart.id !== product.id);
        this.productsSubject.next(this.products);
    }

    increaseQuantity(product: ICartProduct) {
        product.cost = product.cost + product.cost / product.quantity;
        product.quantity++;
    }

    decreaseQuantity(product: ICartProduct) {
        if (product.quantity === 1) {
            this.removeProduct(product);
        } else {
            product.cost = product.cost - product.cost / product.quantity;
            product.quantity--;
        }
        this.productsSubject.next(this.products);
    }

    getTotalCost(): number {
        return this.products.map(product => product.cost).reduce((total, price) => total + price, 0);
    }
}
