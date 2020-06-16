import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '../../models';
import { AppPath, HOVER_BACKGROUND_COLOR } from '../../../shared';
import { AdminPath } from '../../../admin';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    @Input() product: IProduct;
    @Input() isLoggedIn: boolean;
    @Input() isAdmin: boolean;

    @Output() addToCart = new EventEmitter<IProduct>();

    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;

    constructor(private router: Router) {}

    onAddToCart() {
        this.addToCart.emit(this.product);
    }

    getAvailabilityTitle(): string {
        return this.product.isAvailable ? 'Available' : 'Not Available';
    }

    onOpenProductDetails() {
        this.router.navigate([AppPath.Product, this.product.id]);
    }

    onEditProduct() {
        this.router.navigate([
            AppPath.Admin,
            AdminPath.Product,
            AdminPath.Edit,
            this.product.id,
        ]);
    }

    getAddToCartTooltip(): string {
        return this.isLoggedIn ? 'Add to Cart' : 'Please Login First';
    }
}
