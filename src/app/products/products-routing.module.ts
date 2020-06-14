import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent, ProductCardComponent } from './components';
import { ProductsComponent } from './products.component';
import { AppPaths } from '../shared';
import { ResolveProductGuard } from './guards';

const routes: Routes = [
    {
        path: AppPaths.ProductsList,
        component: ProductListComponent,
    },
    {
        path: `${AppPaths.Product}/:id`,
        component: ProductCardComponent,
        resolve: {
            product: ResolveProductGuard,
        },
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
