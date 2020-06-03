import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.models';
import { CartService } from '../../../shared/services/cart.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    products: Observable<IProduct[]>;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
    ) {}

    ngOnInit(): void {
        this.products = this.productService.getProducts();
    }

    addToCart(product: IProduct) {
        if (product.isAvailable) {
            this.cartService.addProduct(product);
        }
    }
}
