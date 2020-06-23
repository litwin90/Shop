import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppPath } from '../shared/shared.constants';
import { CartComponent } from './cart.component';
import { CartPath } from './cart.constants';
import { CartProductComponent, CartTableComponent } from './components';
import { CanLeaveOrderEditGuard, ResolveCartGuard, ResolveCartItemGuard } from './guards';

const routes: Routes = [
    {
        path: AppPath.Empty,
        component: CartComponent,
        children: [
            {
                path: AppPath.Empty,
                component: CartTableComponent,
                resolve: {
                    cartData: ResolveCartGuard,
                },
                data: {
                    label: 'Cart',
                },
            },
            {
                path: `${AppPath.Edit}/:${CartPath.ProductId}`,
                component: CartProductComponent,
                resolve: {
                    product: ResolveCartItemGuard,
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
