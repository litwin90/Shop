import { ICartProduct } from '../../cart';
import { ISelectableEntity } from '../../shared';

export interface IOrder {
    id: string;
    userId: string;
    date: number;
    quantity: number;
    cost: number;
    products: ICartProduct[];
}

export interface ISelectableOrder extends ISelectableEntity, IOrder {}
