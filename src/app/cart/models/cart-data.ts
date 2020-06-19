import { ICartProduct } from './cart-product';
import { ICartInfo } from './cart-info';
import { ICartSetting } from '../../shared';

export interface ICartData {
    products: ICartProduct[];
    info: ICartInfo;
    settings?: ICartSetting;
}
