import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { OrdersService } from '../../services';
import { AppPaths, FlexDirection, WithSubscriptions } from '../../../shared';
import { OrderData } from '../../models';

@Component({
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent extends WithSubscriptions implements OnInit {
    newOrderData: OrderData;
    FlexDirection = FlexDirection;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private ordersService: OrdersService,
    ) {
        super();
    }

    ngOnInit(): void {
        const activeRoute$ = this.activeRoute.data
            .pipe(pluck('orderData'))
            .subscribe((newOrderData: OrderData) => {
                this.newOrderData = newOrderData;
            });
        this.subscriptions.push(activeRoute$);
    }

    private createOrder() {
        this.ordersService.createNewOrder(this.newOrderData);
        this.router.navigate([AppPaths.Orders]);
    }

    onSubmit() {
        this.createOrder();
    }

    onDecline() {
        this.router.navigate([AppPaths.Cart]);
    }
}
