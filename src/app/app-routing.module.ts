import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PathNotFoundComponent } from './layout';
import { AuthGuard } from './core/guards/auth.guard';
import { AppPaths } from './shared';

export const appRoutes: Routes = [
    {
        path: AppPaths.Cart,
        loadChildren: () =>
            import('./cart/cart.module').then(m => m.CartModule),
        canActivate: [AuthGuard],
    },
    {
        path: AppPaths.Orders,
        loadChildren: () =>
            import('./orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard],
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

function RouterErrorHandler(error) {
    console.log(error);
}

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            errorHandler: RouterErrorHandler,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
