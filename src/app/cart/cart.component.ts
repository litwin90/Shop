import { Component, OnInit } from '@angular/core';

import { CartService } from './cart.service';
import { IProduct } from '../product/product.models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    products: IProduct[] = [];

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.products = this.cartService.getProductsInCart();
    }

    get isCartFull(): boolean {
        return !!this.products.length;
    }

    get title(): string {
        return 'Products in cart:';
    }
}
