import { Action, createReducer, on } from '@ngrx/store';

import { InitialProductsState, IProductsState } from './products.state';
import { ProductActions } from './products.actions';

const reducer = createReducer(
    InitialProductsState,

    // INITIAL REQUESTS
    on(
        ProductActions.getProducts,
        ProductActions.addProduct,
        ProductActions.updateProduct,
        ProductActions.removeProduct,
        state => ({
            ...state,
            isLoading: true,
        }),
    ),

    // GET PRODUCTS
    on(ProductActions.getProductsSuccess, (state, { products }) => ({
        ...state,
        isLoading: false,
        products: [...products],
    })),

    // ADD PRODUCT
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

    // UPDATE PRODUCT
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

    // ERRORS
    on(
        ProductActions.addProductError,
        ProductActions.removeProductError,
        ProductActions.updateProductError,
        ProductActions.getProductsError,
        state => ({
            ...state,
            isLoading: false,
        }),
    ),
);

export function productsReducer(state: IProductsState, action: Action) {
    return reducer(state, action);
}
