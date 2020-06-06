import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent, ProductCardComponent } from './components';
import { ProductsComponent } from './products.component';
import { AppPaths } from '../shared';

const routes: Routes = [
    {
        path: AppPaths.ProductsList,
        component: ProductListComponent,
    },
    {
        path: `${AppPaths.Product}/:id`,
        component: ProductCardComponent,
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
        ProductCardComponent,
    ];
}
