import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartTableComponent, CartProductComponent } from './components';
import { CartComponent } from './cart.component';
import { AppPath } from '../shared';
import { CartPath } from './cart.constants';
import {
    CartItemResolveGuard,
    CartResolveGuard,
    CanLeaveOrderEditGuard,
} from './guards';

const routes: Routes = [
    {
        path: AppPath.Empty,
        component: CartComponent,
        children: [
            {
                path: AppPath.Empty,
                component: CartTableComponent,
                resolve: {
                    cartData: CartResolveGuard,
                },
                data: {
                    label: 'Cart',
                },
            },
            {
                path: `${AppPath.Edit}/:${CartPath.ProductId}`,
                component: CartProductComponent,
                resolve: {
                    product: CartItemResolveGuard,
                },
                canDeactivate: [CanLeaveOrderEditGuard],
                data: {
                    label: 'Edit cart product',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CartRoutingModule {
    static components = [
        CartTableComponent,
        CartComponent,
        CartProductComponent,
    ];
}
