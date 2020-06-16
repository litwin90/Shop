import { IProduct } from '../../products/models/product';

export interface ICartProduct extends IProduct {
    quantity: number;
    cost: number;
    isSelected: boolean;
}
