import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { OrdersPaths } from '../../orders.constants';
import { IOrder } from '../../models';
import {
    CartService,
    FlexDirection,
    AppPaths,
    WithSubscriptions,
} from '../../../shared';

@Component({
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends WithSubscriptions implements OnInit {
    order: IOrder;
    FlexDirection = FlexDirection;

    constructor(private router: Router, private activeRoute: ActivatedRoute) {
        super();
    }

    ngOnInit(): void {
        const activeRoute$ = this.activeRoute.data
            .pipe(pluck('order'))
            .subscribe((order: IOrder) => (this.order = order));
        this.subscriptions.push(activeRoute$);
    }

    onEdit() {
        this.router.navigate([
            AppPaths.Orders,
            OrdersPaths.Edit,
            this.order.id,
        ]);
    }
}
