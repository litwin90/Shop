import { ICartProduct } from './cart-product';

export interface ICartSortByField {
    id: ICartSortByFieldId;
    name: string;
}

export type ICartSortByFieldId = keyof ICartProduct;

export enum CartSortingOrder {
    Asc,
    Desc,
}
