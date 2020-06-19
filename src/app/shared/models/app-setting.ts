import { ICartSortByFieldId } from '../../cart';
import { IOrderSortByFieldId } from '../../orders';
import { SortOrder } from './sort-order';

export interface ICartSetting {
    sortBy: ICartSortByFieldId;
    sortOrder: SortOrder;
}

export interface IOrdersSetting {
    sortBy: IOrderSortByFieldId;
}

export interface IAppSetting {
    id: string;
    userId: string;
    cart: ICartSetting;
    orders: IOrdersSetting;
}
