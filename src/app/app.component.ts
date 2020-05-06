import { Component } from '@angular/core';
import { PRODUCTS } from './products/services/product/product.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'shop';
    product = PRODUCTS[0];
}
