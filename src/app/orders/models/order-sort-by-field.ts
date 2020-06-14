import { IOrder } from './order';

export interface IOrderSortByField {
    id: IOrderSortByFieldId;
    name: string;
}

export type IOrderSortByFieldId = keyof IOrder;

export enum CartSortingOrder {
    Asc,
    Desc,
}
