import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ICartProduct } from '../../models/cart-product';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
    @Input() product: ICartProduct;

    @Output() decrease = new EventEmitter<ICartProduct>();
    @Output() increase = new EventEmitter<ICartProduct>();

    onDecrease() {
        this.decrease.emit(this.product);
    }

    onIncrease() {
        this.increase.emit(this.product);
    }
}
