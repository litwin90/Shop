import { Injectable } from '@angular/core';

import { IProduct } from '../../products/models/product.models';
import { PRODUCTS } from '../../products/services/product/product.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    getProductsInCart(): IProduct[] {
        return PRODUCTS; // тут должны быть не товары, а то, что в корзине
    }
}
