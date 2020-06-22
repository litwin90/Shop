import { IProduct } from '../../products';

export interface IProductsState {
    products: ReadonlyArray<IProduct>;
    readonly isLoading: boolean;
}

export const InitialProductsState: IProductsState = {
    products: [],
    isLoading: false,
};
