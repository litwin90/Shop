import { Component } from '@angular/core';
import { Data } from '@angular/router';

import { FlexDirection } from '../shared';

@Component({
    templateUrl: './cart.component.html',
})
export class CartComponent {
    headerLabel: string;
    FlexDirection = FlexDirection;

    onActivate({ routeData }: { routeData: Data }) {
        this.headerLabel = routeData.label;
    }
}
