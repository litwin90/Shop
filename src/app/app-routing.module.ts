import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './admin/guards';
import { AuthGuard } from './core/guards/auth.guard';
import { PathNotFoundComponent } from './layout';
import { AppPath } from './shared/shared.constants';

export const appRoutes: Routes = [
    {
        path: AppPath.Cart,
        loadChildren: () =>
            import('./cart/cart.module').then(m => m.CartModule),
        canActivate: [AuthGuard],
    },
    {
        path: AppPath.Orders,
        loadChildren: () =>
            import('./orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard],
    },
    {
        path: AppPath.Admin,
        loadChildren: () =>
            import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminGuard, AuthGuard],
    },
    {
        path: AppPath.Empty,
        redirectTo: AppPath.ProductsList,
        pathMatch: 'full',
    },
    {
        // The router will match this route if the URL requested
        // doesn't match any Path for routes defined in our configuration
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
