import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: '',
                component: ProductListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {
    static components = [ProductsComponent, ProductListComponent];
}
