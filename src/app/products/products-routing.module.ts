import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppPath } from '../shared/shared.constants';
import { ProductDetailsComponent, ProductListComponent } from './components';
import { ProductsComponent } from './products.component';

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
