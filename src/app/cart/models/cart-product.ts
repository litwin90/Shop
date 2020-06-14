import { IProduct } from '../../products/models/product.models';

export interface ICartProduct extends IProduct {
    quantity: number;
    cost: number;
    isSelected: boolean;
}
