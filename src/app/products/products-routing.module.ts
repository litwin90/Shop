import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent, ProductCardComponent } from './components';
import { ProductsComponent } from './products.component';
import { ProductsPaths } from './products.constants';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: '',
                component: ProductListComponent,
            },
            {
                path: `${ProductsPaths.Product}/:id`,
                component: ProductCardComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {
    static components = [ProductsComponent, ProductListComponent, ProductCardComponent];
}
