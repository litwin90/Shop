import { ICartProduct } from './cart-product';
import { ICartInfo } from './cart-info';

export interface ICartData {
    products: ICartProduct[];
    info: ICartInfo;
}
