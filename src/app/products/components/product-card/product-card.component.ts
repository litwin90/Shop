import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.models';
import { CartService } from '../../../shared/services/cart.service';
import { AppPaths } from '../../../app-routing.module';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
    product: IProduct;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.productService.getProduct(params.get('id'))))
            .subscribe({
                next: (product: IProduct) => {
                    this.product = { ...product };
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
    }

    onAddToCart() {
        this.cartService.addProduct(this.product);
        this.router.navigate([AppPaths.ProductsList]);
    }

    getAvailabilityTitle(): string {
        return this.product.isAvailable ? 'Available' : 'Not Available';
    }
}
