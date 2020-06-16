import { TabsConfig } from './models';

export enum AppPath {
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
        path: AppPath.ProductsList,
        label: 'Products',
        forAdmin: true,
        forUser: true,
    },
    {
        path: AppPath.Cart,
        label: 'Cart',
        forAdmin: false,
        forUser: true,
    },
    {
        path: AppPath.Orders,
        label: 'Orders',
        forAdmin: false,
        forUser: true,
    },
    {
        path: AppPath.Admin,
        label: 'Admin',
        forAdmin: true,
        forUser: false,
    },
];

export const HOVER_BACKGROUND_COLOR = '#d3d3d31f';

export const REQUESTS_DELAY = 300;
