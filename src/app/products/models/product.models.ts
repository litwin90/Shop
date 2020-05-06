export enum Category {
    Primary = 'Primary',
    Secondary = 'Secondary',
}

export enum ProductColors {
    Red = 'Red',
    Blue = 'Blue',
}

export enum ProductSizes {
    S = 'S',
    M = 'M',
    L = 'L',
}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;

    colors: ProductColors[];
    sizes: ProductSizes[];
}
