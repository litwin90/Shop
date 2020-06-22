import { createAction, props } from '@ngrx/store';

import { IProduct } from '../../../products';

export const ProductActions = {
    // GET PRODUCTS
    getProducts: createAction('[Products] get products'),
    getProductsSuccess: createAction(
        '[Products effect] get products success',
        props<{ products: IProduct[] }>(),
    ),
    getProductsError: createAction(
        '[Products effect] get products error',
        props<{ error: Error | string }>(),
    ),

    // GET PRODUCT
    getProduct: createAction('[Products] get product', props<{ id: string }>()),

    // ADD PRODUCT
    addProduct: createAction(
        '[Products] add product',
        props<{ product: Omit<IProduct, 'id'> }>(),
    ),
    addProductSuccess: createAction(
        '[Products] add product success',
        props<{ product: IProduct }>(),
    ),
    addProductError: createAction(
        '[Products] add products error',
        props<{ error: Error | string }>(),
    ),

    // UPDATE PRODUCT
    updateProduct: createAction(
        '[Products] update product',
        props<{ id: string; product: IProduct }>(),
    ),
    updateProductSuccess: createAction(
        '[Products] update product success',
        props<{ product: IProduct }>(),
    ),
    updateProductError: createAction(
        '[Products] update products error',
        props<{ error: Error | string }>(),
    ),

    // REMOVE PRODUCT
    removeProduct: createAction(
        '[Products] remove product',
        props<{ id: string }>(),
    ),
    removeProductSuccess: createAction(
        '[Products] remove product success',
        props<{ id: string }>(),
    ),
    removeProductError: createAction(
        '[Products] remove products error',
        props<{ error: Error | string }>(),
    ),
};
