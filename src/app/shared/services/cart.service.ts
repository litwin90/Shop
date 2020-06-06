import { Injectable } from '@angular/core';

import { Subject, Observable, of } from 'rxjs';

import { ICartProduct, ICartInfo } from '../../cart';
import { IProduct } from '../../products';
import { delay } from 'rxjs/operators';

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

    getProduct(id: string): Observable<ICartProduct | undefined> {
        return of(this.cartProducts.find(product => product.id === id)).pipe(
            delay(2000),
        );
    }

    getProducts(): ICartProduct[] {
        return this.cartProducts;
    }

    getCartInfo(): ICartInfo {
        return {
            totalQuantity: this.totalQuantity,
            totalSum: this.totalSum,
        };
    }

    addProduct(product: IProduct) {
        const cartProduct = this.cartProducts.find(
            productInCart => productInCart.id === product.id,
        );
        if (cartProduct) {
            this.increaseQuantity(cartProduct.id);
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

    removeProduct(id: string) {
        this.cartProducts = this.cartProducts.filter(
            productInCart => productInCart.id !== id,
        );
        this.updateCartData();
    }

    increaseQuantity(id: string) {
        const product = this.cartProducts.find(p => p.id === id);
        product.cost = product.cost + product.cost / product.quantity;
        product.quantity++;
        this.updateCartData();
    }

    setQuantity(id: string, quantity: number) {
        const product = this.cartProducts.find(p => p.id === id);
        const price = product.cost / product.quantity;
        product.quantity = quantity;
        product.cost = price * quantity;
        this.updateCartData();
    }

    updateProduct({
        id,
        quantity,
        cost,
    }: Pick<ICartProduct, 'id' | 'quantity' | 'cost'>) {
        const product = this.cartProducts.find(p => p.id === id);
        product.cost = cost;
        product.quantity = quantity;
        this.updateCartData();
    }

    decreaseQuantity(product: ICartProduct) {
        if (product.quantity === 1) {
            this.removeProduct(product.id);
        } else {
            product.cost = product.cost - product.cost / product.quantity;
            product.quantity--;
        }
        this.updateCartData();
    }

    removeProducts(products: ICartProduct[]) {
        const productsToRemoveIds = products.map(product => product.id);

        this.cartProducts = this.cartProducts.filter(
            product => !productsToRemoveIds.includes(product.id),
        );
        this.updateCartData();
    }

    removeAllProducts() {
        this.removeProducts(this.cartProducts);
        this.updateCartData();
    }

    checkAllItems() {
        this.cartProducts.forEach(product => {
            product.isSelected = true;
        });
        this.updateCartData();
    }

    unCheckAllItems() {
        this.cartProducts.forEach(product => {
            product.isSelected = false;
        });
        this.updateCartData();
    }

    private updateCartData() {
        this.productsSubject.next(this.cartProducts);
        this.totalQuantity = this.cartProducts.reduce(
            (quantity, product) => quantity + product.quantity,
            0,
        );
        this.totalSum = this.cartProducts.reduce(
            (sum, product) => sum + product.cost,
            0,
        );
        this.cartInfoSubject.next({
            totalSum: this.totalSum,
            totalQuantity: this.totalQuantity,
        });
    }
}
