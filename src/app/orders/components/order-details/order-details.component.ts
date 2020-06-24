import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { AuthService, WithSubscriptions } from '../../../shared';
import { RouterFacade } from '../../../state';
import { IOrder } from '../../models';

@Component({
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends WithSubscriptions implements OnInit {
    order: IOrder;
    isAdmin = false;

    constructor(
        private routerFacade: RouterFacade,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        const { userInfo } = this.authService.getAuthData();
        if (userInfo?.isAdmin) {
            this.isAdmin = true;
        }
        const activeRoute$ = this.activeRoute.data
            .pipe(pluck('order'))
            .subscribe((order: IOrder) => (this.order = order));
        this.subscriptions.push(activeRoute$);
    }

    onEdit() {
        this.routerFacade.goToEditOrder(this.order.id);
    }
}
