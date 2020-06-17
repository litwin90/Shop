import { Injectable } from '@angular/core';

import { Subject, Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { DialogService, REQUESTS_DELAY } from '../../shared';
import { IProduct } from '../../products';
import { ICartData, ICartProduct, ICartInfo } from '../models';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartData: ICartData = {
        products: [],
        info: {
            totalSum: 0,
            totalQuantity: 0,
        },
    };

    cartDataSubject: Subject<ICartData> = new Subject();

    constructor(private dialog: DialogService) {
        this.updateCartData();
    }

    getProduct(id: string): Observable<ICartProduct | undefined> {
        return of(
            this.cartData.products.find(product => product.id === id),
        ).pipe(
            tap(product => {
                if (!product) {
                    this.dialog.show({
                        message: `There is no such product in the cart with id ${id}`,
                    });
                }
            }),
        );
    }

    getProducts(): Observable<ICartProduct[]> {
        return of(this.cartData.products).pipe(
            tap(products => {
                if (!products) {
                    this.dialog.show({ message: 'Unable to get products' });
                }
            }),
        );
    }

    getCartInfo(): Observable<ICartInfo> {
        return of({
            totalQuantity: this.cartData.info.totalQuantity,
            totalSum: this.cartData.info.totalSum,
        }).pipe(
            tap(product => {
                if (!product) {
                    this.dialog.show({ message: 'Unable to get product' });
                }
            }),
        );
    }

    addProduct(product: IProduct) {
        const cartProduct = this.cartData.products.find(
            productInCart => productInCart.id === product.id,
        );
        if (cartProduct) {
            this.increaseQuantity(cartProduct.id);
        } else {
            this.cartData.products.push({
                ...product,
                cost: product.price,
                quantity: 1,
                isSelected: false,
            });
        }
        this.updateCartData();
        this.dialog.show({ message: `${product.name} is added to cart` });
    }

    removeProduct(id: string) {
        this.cartData.products = this.cartData.products.filter(
            productInCart => productInCart.id !== id,
        );
        this.updateCartData();
    }

    increaseQuantity(id: string) {
        const product = this.cartData.products.find(p => p.id === id);
        product.cost = product.cost + product.cost / product.quantity;
        product.quantity++;
        this.updateCartData();
    }

    setQuantity(id: string, quantity: number) {
        const product = this.cartData.products.find(p => p.id === id);
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
        const product = this.cartData.products.find(p => p.id === id);
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

        this.cartData.products = this.cartData.products.filter(
            product => !productsToRemoveIds.includes(product.id),
        );
        this.updateCartData();
    }

    removeAllProducts() {
        this.removeProducts(this.cartData.products);
        this.updateCartData();
    }

    checkAllItems() {
        this.cartData.products.forEach(product => {
            product.isSelected = true;
        });
        this.updateCartData();
    }

    unCheckAllItems() {
        this.cartData.products.forEach(product => {
            product.isSelected = false;
        });
        this.updateCartData();
    }

    private updateCartData() {
        this.cartData.info.totalQuantity = this.cartData.products.reduce(
            (quantity, product) => quantity + product.quantity,
            0,
        );
        this.cartData.info.totalSum = this.cartData.products.reduce(
            (sum, product) => sum + product.cost,
            0,
        );
        this.cartDataSubject.next(this.cartData);
    }
}
