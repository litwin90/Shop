import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export const selectRouterState = createFeatureSelector<
    RouterReducerState<RouterStateUrl>
>('router');

export const selectRouterData = createSelector(
    selectRouterState,
    ({ state }) => state.data,
);

export const selectRouterProductId = createSelector(
    selectRouterState,
    ({ state }) => {
        return state.params.id as string;
    },
);
