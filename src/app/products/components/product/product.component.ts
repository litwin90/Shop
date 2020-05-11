import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { IProduct } from '../../models/product.models';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    @Input() product: IProduct;

    @Output() addToCart = new EventEmitter<IProduct>();

    onBuy() {
        this.addToCart.emit(this.product);
    }

    get availabilityTitle(): string {
        return this.product.isAvailable ? 'Available' : 'Not Available';
    }
}
