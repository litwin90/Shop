import { createSelector } from '@ngrx/store';

import { selectRouterProductId } from '../';
import { selectEntityCacheState } from '../entity-store.module';

export const selectProducts = createSelector(
    selectEntityCacheState,
    (state: any) => state.Product.entities,
);

export const selectProductByUrl = createSelector(
    selectProducts,
    selectRouterProductId,
    (products, id) => products[id],
);

export const selectProductFromMapByUrl = createSelector(
    selectRouterProductId,
    (productsMap, id) => {
        return productsMap.get(id);
    },
);
