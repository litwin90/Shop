import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppPaths } from '../shared';
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
import { OrdersPaths } from './orders.constants';
import { OrderCreateResolveGuard } from './guards/order-create-resolve.guard';

const routes: Routes = [
    {
        path: AppPaths.Empty,
        component: OrdersComponent,
        children: [
            {
                path: OrdersPaths.Empty,
                component: OrdersListComponent,
                resolve: {
                    orders: OrdersResolveGuard,
                },
                data: {
                    label: 'Order list',
                },
            },
            {
                path: OrdersPaths.Create,
                component: CreateOrderComponent,
                resolve: {
                    orderData: OrderCreateResolveGuard,
                },
                data: {
                    label: 'Create Order',
                },
            },
            {
                path: `${OrdersPaths.OrderDetails}/:${OrdersPaths.OrderId}`,
                component: OrderDetailsComponent,
                resolve: {
                    order: OrderDetailsResolveGuard,
                },
                data: {
                    label: 'Order details',
                },
            },
            {
                path: `${OrdersPaths.Edit}/:${OrdersPaths.OrderId}`,
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
