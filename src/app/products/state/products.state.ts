import { IProduct } from '../../products';

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
