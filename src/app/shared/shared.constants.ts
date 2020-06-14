export enum AppPaths {
    Empty = '',
    ProductsList = 'products-list',
    Product = 'product',
    Cart = 'cart',
    Orders = 'orders',
    Edit = 'edit',
}

export const appTabsConfig: { path: string; label: string }[] = [
    {
        path: AppPaths.ProductsList,
        label: 'Products',
    },
    {
        path: AppPaths.Cart,
        label: 'Cart',
    },
    {
        path: AppPaths.Orders,
        label: 'Orders',
    },
];

export const HOVER_BACKGROUND_COLOR = '#d3d3d31f';

export const REQUESTS_DELAY = 300;
