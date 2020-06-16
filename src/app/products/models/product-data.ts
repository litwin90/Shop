import { IProduct } from './product';

export type ProductData = Omit<IProduct, 'id' | 'updateDate'>;
