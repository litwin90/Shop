import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterState } from './router.state';

export const routerReducers: ActionReducerMap<RouterState> = {
    router: routerReducer,
};
