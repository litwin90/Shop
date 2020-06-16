import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Data } from '@angular/router';

import { FlexDirection } from '../shared';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
    headerLabel: string;
    FlexDirection = FlexDirection;

    onActivate({ routeData }: { routeData: Data }) {
        this.headerLabel = routeData.label;
    }
}
