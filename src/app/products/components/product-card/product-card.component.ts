import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';

import { IProduct } from '../../models';
import { HOVER_BACKGROUND_COLOR } from '../../../shared';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input() product: IProduct;
    @Input() isLoggedIn: boolean;
    @Input() isAdmin: boolean;

    @Output() addToCart = new EventEmitter();
    @Output() removeProduct = new EventEmitter();
    @Output() openDetails = new EventEmitter();
    @Output() editProduct = new EventEmitter();

    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;

    onAddToCart() {
        this.addToCart.emit();
    }

    onOpenProductDetails() {
        this.openDetails.emit();
    }

    onEditProduct() {
        this.editProduct.emit();
    }

    onRemoveProduct() {
        this.removeProduct.emit(this.product.id);
    }

    getAddToCartTooltip(): string {
        return this.isLoggedIn ? 'Add to Cart' : 'Please Login First';
    }
}
