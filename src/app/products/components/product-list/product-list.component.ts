import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../models/product.models';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    products: IProduct[];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.products = this.productService.getProducts();
    }
}
