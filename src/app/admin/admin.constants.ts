import { AppPaths } from '../shared';

export enum AdminPath {
    Empty = '',
    Products = 'products',
    Orders = 'orders',
    Product = 'product',
    Add = 'add',
    Edit = 'edit',
    Id = 'id',
}

export const adminTabsConfig: { path: string[]; label: string }[] = [
    {
        path: [AdminPath.Products],
        label: 'Manage Products',
    },
    {
        path: [AdminPath.Orders],
        label: 'Manage Orders',
    },
];
