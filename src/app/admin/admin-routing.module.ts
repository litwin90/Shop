import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPath } from './admin.constants';
import { AdminComponent } from './admin.component';
import { CanLeaveProductAddGuard, CanLeaveProductEditGuard } from './guards';
import { AddProductComponent, EditProductComponent } from './components';
import { ProductListComponent, ResolveProductGuard } from '../products';
import { AppPaths } from '../shared';
import { OrdersListComponent } from '../orders';
import { ResolveAdminOrdersGuard } from './guards/resolve-admin-orders.guard';

const routes: Routes = [
    {
        path: AdminPath.Empty,
        component: AdminComponent,
        children: [
            {
                path: AdminPath.Empty,
                redirectTo: AdminPath.Products,
            },
            {
                path: AdminPath.Products,
                component: ProductListComponent,
                data: {
                    label: 'Manage Products',
                },
            },
            {
                path: AdminPath.Product,
                children: [
                    {
                        path: AdminPath.Add,
                        component: AddProductComponent,
                        canDeactivate: [CanLeaveProductAddGuard],
                        data: {
                            label: 'Add new product',
                        },
                    },
                    {
                        path: `${AdminPath.Edit}/:${AdminPath.Id}`,
                        component: EditProductComponent,
                        canDeactivate: [CanLeaveProductEditGuard],
                        data: {
                            label: 'Edit product',
                        },
                        resolve: {
                            product: ResolveProductGuard,
                        },
                    },
                ],
            },
            {
                path: AdminPath.Orders,
                component: OrdersListComponent,
                data: {
                    label: 'Manage Orders',
                },
                resolve: {
                    orders: ResolveAdminOrdersGuard,
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
    static components = [
        EditProductComponent,
        AddProductComponent,
        AdminComponent,
    ];
}
