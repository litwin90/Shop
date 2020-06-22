import { Action, createReducer, on } from '@ngrx/store';

import { InitialProductsState, IProductsState } from './products.state';
import { ProductActions } from './products.actions';

const reducer = createReducer(
    InitialProductsState,
    // on(ProductActions.getProduct, state => ({ ...state })),

    // ADD PRODUCT
    on(ProductActions.addProduct, state => ({ ...state, isLoading: true })),
    on(ProductActions.addProductSuccess, (state, { product }) => ({
        ...state,
        products: [
            ...state.products.filter(
                stateProduct => product.id !== stateProduct.id,
            ),
            product,
        ],
        isLoading: false,
    })),
    on(ProductActions.addProductError, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),

    // REMOVE PRODUCT
    on(ProductActions.removeProduct, state => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(ProductActions.removeProductSuccess, (state, { id }) => ({
        ...state,
        products: [...state.products.filter(product => product.id !== id)],
        isLoading: false,
    })),
    on(ProductActions.removeProductError, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),

    // UPDATE PRODUCT
    on(ProductActions.updateProduct, state => ({ ...state })),
    on(ProductActions.updateProductSuccess, (state, { product }) => ({
        ...state,
        products: [
            ...state.products.filter(
                stateProduct => product.id !== stateProduct.id,
            ),
            product,
        ],
        isLoading: false,
    })),
    on(ProductActions.updateProductError, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),

    // GET PRODUCTS
    on(ProductActions.getProducts, state => ({ ...state, isLoading: true })),
    on(ProductActions.getProductsSuccess, (state, { products }) => ({
        ...state,
        isLoading: false,
        products: [...products],
    })),
    on(ProductActions.getProductsError, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),
);

export function productsReducer(state: IProductsState, action: Action) {
    return reducer(state, action);
}
