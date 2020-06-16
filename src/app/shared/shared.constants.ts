import { TabsConfig } from './models';

export enum AppPaths {
    Empty = '',
    ProductsList = 'products-list',
    Product = 'product',
    Cart = 'cart',
    Orders = 'orders',
    Edit = 'edit',
    Admin = 'admin',
}

export const appTabsConfig: TabsConfig = [
    {
        path: AppPaths.ProductsList,
        label: 'Products',
        forAdmin: true,
        forUser: true,
    },
    {
        path: AppPaths.Cart,
        label: 'Cart',
        forAdmin: false,
        forUser: true,
    },
    {
        path: AppPaths.Orders,
        label: 'Orders',
        forAdmin: false,
        forUser: true,
    },
    {
        path: AppPaths.Admin,
        label: 'Admin',
        forAdmin: true,
        forUser: false,
    },
];

export const HOVER_BACKGROUND_COLOR = '#d3d3d31f';

export const REQUESTS_DELAY = 300;
