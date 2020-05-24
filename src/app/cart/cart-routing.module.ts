import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartTableComponent } from './components/cart-table/cart-table.component';
import { CartComponent } from './cart.component';

const routes: Routes = [
    {
        path: '',
        component: CartComponent,
        children: [
            {
                path: '',
                component: CartTableComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CartRoutingModule {
    static components = [CartTableComponent, CartComponent];
}
