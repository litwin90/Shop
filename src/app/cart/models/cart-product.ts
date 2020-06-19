import { IProduct } from '../../products/models/product';
import { ISelectableEntity } from '../../shared';

export interface IBaseCartProduct extends IProduct {
    quantity: number;
    cost: number;
    productId: string;
}

export interface ICartProduct extends IBaseCartProduct, ISelectableEntity {}
