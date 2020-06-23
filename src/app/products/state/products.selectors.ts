import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProductsState } from './products.state';
import { selectRouterProductId } from '../../router-state';

export const selectProductsState = createFeatureSelector<IProductsState>(
    'products',
);

export const selectProducts = createSelector(
    selectProductsState,
    (state: IProductsState) => state.products,
);

export const selectProductsLoading = createSelector(
    selectProductsState,
    (state: IProductsState) => state.isLoading,
);

export const selectProductByUrl = createSelector(
    selectProducts,
    selectRouterProductId,
    (products, id) => products.find(product => product.id === id),
);
