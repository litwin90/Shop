import { Component, Input } from '@angular/core';

import { IProduct } from './product.models';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    @Input() product: IProduct;

    onBuy() {
        console.log('Product is bought');
    }
}
