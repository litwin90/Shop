import { ICartProduct } from '../../cart';
import { ISelectableEntity } from '../../shared';

export interface IBaseOrder {
    id: string;
    userId: string;
    date: number;
    quantity: number;
    cost: number;
    products: ICartProduct[];
}

export interface IOrder extends ISelectableEntity, IBaseOrder {}
