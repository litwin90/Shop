import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IProduct } from '../../models/product.models';
import { ProductsPaths } from '../../products-routing.module';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    @Input() product: IProduct;

    @Output() addToCart = new EventEmitter<IProduct>();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    onBuy() {
        this.addToCart.emit(this.product);
    }

    getAvailabilityTitle(): string {
        return this.product.isAvailable ? 'Available' : 'Not Available';
    }

    onOpenProductDetails(product: IProduct) {
        this.router.navigate([ProductsPaths.Product, product.id], { relativeTo: this.activatedRoute });
    }
}
