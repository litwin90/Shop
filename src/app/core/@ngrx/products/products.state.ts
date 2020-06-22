import { IProduct, Category } from '../../../products/models/product';

export interface IProductsState {
    products: ReadonlyArray<IProduct>;
    readonly isLoading: boolean;
    readonly error: Error | string;
}

export const InitialProductsState: IProductsState = {
    products: [],
    isLoading: false,
    error: undefined,
};
