import { Injectable, Inject } from '@angular/core';

import { APP_LOCAL_STORAGE } from '../../provider-tokens';

@Injectable()
export class LocalStorageService {
    constructor(@Inject(APP_LOCAL_STORAGE) private localStorage: Storage) {}

    setItem(key: string, value: string | { [key: string]: any }) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem<T>(key: string): T {
        const storedValue = this.localStorage.getItem(key);
        return JSON.parse(storedValue);
    }

    removeItem(key: string) {
        this.localStorage.removeItem(key);
    }
}
