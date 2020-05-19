import { InjectionToken } from '@angular/core';
import { IAppConstants } from './core/services/constants/constants.service';

export const APP_LOCAL_STORAGE = new InjectionToken<Storage>('appLocalStorage', {
    providedIn: 'root',
    factory: () => localStorage,
});
export const APP_CONSTANTS = new InjectionToken<IAppConstants>('appConstants');
export const APP_RANDOM_STRING_5 = new InjectionToken<string>('appRandomString5');
