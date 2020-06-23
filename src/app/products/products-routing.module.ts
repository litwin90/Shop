import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent, ProductDetailsComponent } from './components';
import { ProductsComponent } from './products.component';
import { AppPath } from '../shared';

const routes: Routes = [
    {
        path: AppPath.Empty,
        component: ProductsComponent,
        children: [
            {
                path: AppPath.ProductsList,
                component: ProductListComponent,
                data: {
                    label: 'Product List',
                },
            },
            {
                path: `${AppPath.Product}/:id`,
                component: ProductDetailsComponent,
                data: {
                    label: 'Product Details',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {
    static components = [
        ProductsComponent,
        ProductListComponent,
        ProductDetailsComponent,
    ];
}
