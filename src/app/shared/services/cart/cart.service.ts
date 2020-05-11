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

    private updateProducts() {
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
                isSelected: false,
            });
        }
        this.updateProducts();
    }

    removeProduct(product: ICartProduct) {
        this.products = this.products.filter(productInCart => productInCart.id !== product.id);
        this.updateProducts();
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
    }

    getTotalCost(): number {
        return this.products.map(product => product.cost).reduce((total, price) => total + price, 0);
    }

    removeProducts(products: ICartProduct[]) {
        const productsToRemoveIds = products.map(product => product.id);

        this.products = this.products.filter(product => !productsToRemoveIds.includes(product.id));
        this.updateProducts();
    }
}
