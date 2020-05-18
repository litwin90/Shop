import { InjectionToken } from '@angular/core';
import { IAppConstants } from './core/services/constants/constants.service';

export const APP_LOCAL_STORAGE = new InjectionToken<Storage>('appLocalStorage');
export const APP_CONSTANTS = new InjectionToken<IAppConstants>('appConstants');
