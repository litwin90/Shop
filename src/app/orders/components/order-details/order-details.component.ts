import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { OrdersPaths } from '../../orders.constants';
import { IOrder } from '../../models';
import { AppPaths, WithRouteData, AuthService } from '../../../shared';

@Component({
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends WithRouteData implements OnInit {
    order: IOrder;
    isAdmin = false;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
    ) {
        super(activeRoute);
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
        this.router.navigate([
            AppPaths.Orders,
            OrdersPaths.Edit,
            this.order.id,
        ]);
    }
}
