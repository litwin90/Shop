import { IProduct } from '../../products/models/product.models';

export interface ICartProduct extends Pick<IProduct, 'id' | 'name'> {
    quantity: number;
    cost: number;
}
