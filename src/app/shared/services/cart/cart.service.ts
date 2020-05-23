import { Injectable } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { IProduct } from '../../../products/models/product.models';
import { ICartProduct } from '../../../cart/models/cart-product';
import { ICartInfo } from '../../../cart/models/cart-info';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartProducts: ICartProduct[] = [];
    private totalQuantity: number;
    private totalSum: number;

    public productsSubject = new Subject<ICartProduct[]>();
    public cartInfoSubject = new Subject<ICartInfo>();

    constructor() {
        this.updateCartData();
    }

    addProduct(product: IProduct) {
        const cartProduct = this.cartProducts.find(productInCart => productInCart.id === product.id);
        if (cartProduct) {
            this.increaseQuantity(cartProduct);
        } else {
            this.cartProducts.push({
                id: product.id,
                name: product.name,
                cost: product.price,
                quantity: 1,
                isSelected: false,
            });
        }
        this.updateCartData();
    }

    removeProduct(product: ICartProduct) {
        this.cartProducts = this.cartProducts.filter(productInCart => productInCart.id !== product.id);
        this.updateCartData();
    }

    increaseQuantity(product: ICartProduct) {
        product.cost = product.cost + product.cost / product.quantity;
        product.quantity++;
        this.updateCartData();
    }

    decreaseQuantity(product: ICartProduct) {
        if (product.quantity === 1) {
            this.removeProduct(product);
        } else {
            product.cost = product.cost - product.cost / product.quantity;
            product.quantity--;
        }
        this.updateCartData();
    }

    removeProducts(products: ICartProduct[]) {
        const productsToRemoveIds = products.map(product => product.id);

        this.cartProducts = this.cartProducts.filter(product => !productsToRemoveIds.includes(product.id));
        this.updateCartData();
    }

    removeAllProducts() {
        this.removeProducts(this.cartProducts);
        this.updateCartData();
    }

    private updateCartData() {
        this.productsSubject.next(this.cartProducts);
        this.totalQuantity = this.cartProducts.reduce((quantity, product) => quantity + product.quantity, 0);
        this.totalSum = this.cartProducts.reduce((sum, product) => sum + product.cost, 0);
        this.cartInfoSubject.next({ totalSum: this.totalSum, totalQuantity: this.totalQuantity });
    }
}
