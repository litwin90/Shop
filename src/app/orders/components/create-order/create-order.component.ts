import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { RouterFacade } from '../../../router-state';
import { WithSubscriptions } from '../../../shared';
import { OrderData } from '../../models';
import { OrdersService } from '../../services';

@Component({
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent extends WithSubscriptions implements OnInit {
    newOrderData: OrderData;

    constructor(
        private routerFacade: RouterFacade,
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
        this.ordersService.createNewOrder(this.newOrderData).subscribe();
        this.routerFacade.goToOrders();
    }

    onSubmit() {
        this.createOrder();
    }

    onDecline() {
        this.routerFacade.goToCart();
    }
}
