import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppPath } from '../shared';
import { OrdersComponent } from './orders.component';
import {
    OrdersListComponent,
    CreateOrderComponent,
    OrderDetailsComponent,
    EditOrderComponent,
} from './components';
import {
    CanLeaveEditOrderGuard,
    OrderDetailsResolveGuard,
    OrdersResolveGuard,
} from './guards';
import { OrdersPath } from './orders.constants';
import { OrderCreateResolveGuard } from './guards/order-create-resolve.guard';

const routes: Routes = [
    {
        path: AppPath.Empty,
        component: OrdersComponent,
        children: [
            {
                path: OrdersPath.Empty,
                component: OrdersListComponent,
                resolve: {
                    orders: OrdersResolveGuard,
                },
                data: {
                    label: 'Order list',
                },
            },
            {
                path: OrdersPath.Create,
                component: CreateOrderComponent,
                resolve: {
                    orderData: OrderCreateResolveGuard,
                },
                data: {
                    label: 'Create Order',
                },
            },
            {
                path: `${OrdersPath.OrderDetails}/:${OrdersPath.OrderId}`,
                component: OrderDetailsComponent,
                resolve: {
                    order: OrderDetailsResolveGuard,
                },
                data: {
                    label: 'Order details',
                },
            },
            {
                path: `${OrdersPath.Edit}/:${OrdersPath.OrderId}`,
                component: EditOrderComponent,
                resolve: {
                    order: OrderDetailsResolveGuard,
                },
                canDeactivate: [CanLeaveEditOrderGuard],
                data: {
                    label: 'Edit order',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule {
    static components = [
        OrdersComponent,
        OrdersListComponent,
        CreateOrderComponent,
        OrderDetailsComponent,
        CreateOrderComponent,
        EditOrderComponent,
    ];
}
