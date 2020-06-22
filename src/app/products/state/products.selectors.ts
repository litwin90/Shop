import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProductsState } from './products.state';

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
