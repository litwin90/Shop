import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

export enum ProductsPaths {
    Product = 'product',
}

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
