import { IOrder } from './order';

export type OrderData = Pick<IOrder, 'cost' | 'quantity' | 'products'>;
