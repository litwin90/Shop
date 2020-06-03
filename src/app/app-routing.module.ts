import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PathNotFoundComponent } from './layout';

export enum AppPaths {
    Empty = '',
    ProductsList = 'products-list',
    Product = 'product',
    Cart = 'cart',
}

export const appRoutes: Routes = [
    {
        path: AppPaths.Cart,
        loadChildren: () =>
            import('./cart/cart.module').then(m => m.CartModule),
    },
    {
        path: AppPaths.Empty,
        redirectTo: AppPaths.ProductsList,
        pathMatch: 'full',
    },
    {
        // The router will match this route if the URL requested
        // doesn't match any paths for routes defined in our configuration
        path: '**',
        component: PathNotFoundComponent,
    },
];

export const appTabsConfig: { path: string; label: string }[] = [
    {
        path: AppPaths.ProductsList,
        label: 'Products',
    },
    {
        path: AppPaths.Cart,
        label: 'Cart',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
