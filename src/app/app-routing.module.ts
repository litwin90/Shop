import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './products/components/product-list/product-list.component';
import { HomeComponent } from './layout/components/home/home.component';
import { PathNotFoundComponent } from './layout/components/path-not-found/path-not-found.component';

enum AppPaths {
    Home = 'home',
    ProductsList = 'products-list',
    Cart = 'cart',
}

export const appRoutes: Routes = [
    {
        path: AppPaths.Home,
        component: HomeComponent,
    },
    {
        path: AppPaths.ProductsList,
        component: ProductListComponent,
    },
    {
        path: AppPaths.Cart,
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
    },
    {
        path: '',
        redirectTo: AppPaths.Home,
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
        path: AppPaths.Home,
        label: 'Home',
    },
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
