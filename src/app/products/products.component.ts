import { Component } from '@angular/core';
import { Data } from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
})
export class ProductsComponent {
    headerLabel: string;

    onActivate({ routeData }: { routeData: Data }) {
        this.headerLabel = routeData.label;
    }
}
