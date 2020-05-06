import { Injectable } from '@angular/core';

import { IProduct } from '../product/product.models';
import { PRODUCTS } from '../product/product.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    getProductsInCart(): IProduct[] {
        return PRODUCTS;
    }
}
