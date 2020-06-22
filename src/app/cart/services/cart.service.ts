import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, zip, merge, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IProduct } from '../../products';
import { ICartData, ICartProduct, ICartInfo } from '../models';
import { CartHttpService } from './cart-http.service';
import { AppPath, AppSettingsService } from '../../shared';

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

    cartDataSubject: BehaviorSubject<ICartData>;

    constructor(
        private cartHttp: CartHttpService,
        private router: Router,
        private settings: AppSettingsService,
    ) {
        this.cartDataSubject = new BehaviorSubject(this.cartData);
        this.cartHttp.getProducts().subscribe(products => {
            this.cartData.products = products;
            this.updateCartData();
        });
        merge(this.settings.get(), settings.settingsSubject).subscribe(
            ({ cart }) => {
                this.cartData.settings = cart;
                this.updateCartData();
            },
        );
    }

    getProduct(id: string): ICartProduct {
        return this.cartData.products.find(product => product.id === id);
    }

    getProducts(): ICartProduct[] {
        return this.cartData.products;
    }

    getCartInfo(): ICartInfo {
        return {
            totalQuantity: this.cartData.info.totalQuantity,
            totalSum: this.cartData.info.totalSum,
        };
    }

    addProductToCart(product: IProduct): Observable<ICartProduct> {
        const cartProduct = this.cartData.products.find(
            ({ productId }) => productId === product.id,
        );

        if (cartProduct) {
            return this.increaseQuantity(cartProduct.id);
        } else {
            return this.addCartProduct(this.createCartProduct(product));
        }
    }

    private createCartProduct(product: IProduct): ICartProduct {
        return {
            ...product,
            quantity: 1,
            cost: product.price,
            isSelected: false,
            productId: product.id,
        };
    }

    addCartProduct(product: Omit<ICartProduct, 'id'>) {
        return this.cartHttp.addProduct(product).pipe(
            tap(newProduct => {
                this.cartData.products.push(newProduct);
                this.updateCartData();
            }),
        );
    }

    increaseQuantity(id: string): Observable<ICartProduct> {
        const product = this.cartData.products.find(p => p.id === id);
        product.cost = product.cost + product.cost / product.quantity;
        product.quantity++;
        return this.updateProduct(product);
    }

    updateProduct(product: ICartProduct) {
        return this.cartHttp.updateProduct(product).pipe(
            tap(updatedProduct => {
                this.cartData.products = this.cartData.products.filter(
                    ({ id: productId }) => productId !== updatedProduct.id,
                );
                this.cartData.products.push(updatedProduct);
                this.updateCartData();
            }),
        );
    }

    decreaseQuantity(product: ICartProduct) {
        if (product.quantity === 1) {
            return this.removeProduct(product.id);
        } else {
            product.cost = product.cost - product.cost / product.quantity;
            product.quantity--;
            return this.updateProduct(product);
        }
    }

    removeProduct(id: string) {
        return this.cartHttp.deleteProduct(id).pipe(
            tap(() => {
                this.cartData.products = this.cartData.products.filter(
                    productInCart => productInCart.id !== id,
                );
                this.updateCartData();
            }),
        );
    }

    removeProducts(products: ICartProduct[]) {
        return zip(...products.map(({ id }) => this.removeProduct(id))).pipe(
            tap(() => {
                const productsToRemoveIds = products.map(product => product.id);

                this.cartData.products = this.cartData.products.filter(
                    product => !productsToRemoveIds.includes(product.id),
                );
                this.updateCartData();
                if (!this.cartData.products.length) {
                    this.router.navigate([AppPath.ProductsList]);
                }
            }),
        );
    }

    removeAllProducts() {
        return this.removeProducts(this.cartData.products);
    }

    checkAllItems() {
        this.cartData.products = this.cartData.products.map(product => {
            product.isSelected = true;
            return product;
        });
        this.updateCartData();
    }

    unCheckAllItems() {
        this.cartData.products = this.cartData.products.map(product => {
            product.isSelected = false;
            return product;
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
