import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '../../models';
import { AppPaths } from '../../../shared';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    @Input() product: IProduct;
    @Input() isLoggedIn;

    @Output() addToCart = new EventEmitter<IProduct>();

    constructor(private router: Router) {}

    onAddToCart() {
        this.addToCart.emit(this.product);
    }

    getAvailabilityTitle(): string {
        return this.product.isAvailable ? 'Available' : 'Not Available';
    }

    onOpenProductDetails(product: IProduct) {
        this.router.navigate([AppPaths.Product, product.id]);
    }

    getAddToCartTooltip(): string {
        return this.isLoggedIn ? 'Add to Cart' : 'Please Login First';
    }
}
