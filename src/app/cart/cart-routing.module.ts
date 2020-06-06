import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartTableComponent, CartProductComponent } from './components';
import { CartComponent } from './cart.component';
import { AppPaths } from '../shared';
import { CartPaths } from './cart.constants';
import { CartItemResolveGuard } from './guards';

const routes: Routes = [
    {
        path: AppPaths.Empty,
        component: CartComponent,
        children: [
            {
                path: AppPaths.Empty,
                component: CartTableComponent,
            },
            {
                path: `${AppPaths.Edit}/:${CartPaths.ProductId}`,
                component: CartProductComponent,
                resolve: {
                    productData: CartItemResolveGuard,
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
