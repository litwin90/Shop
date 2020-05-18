import { Injectable, Inject } from '@angular/core';
import { APP_LOCAL_STORAGE } from '../../../provider-tokens';

@Injectable()
export class LocalStorageService {
    constructor(@Inject(APP_LOCAL_STORAGE) private localStorage: Storage) {}

    setItem(key: string, value: string | { [key: string]: any }) {
        if (typeof value === 'string') {
            this.localStorage.setItem(key, value);
        } else {
            this.localStorage.setItem(key, JSON.stringify(value));
        }
    }

    getItem(key: string): string | { [key: string]: any } {
        const storedValue = this.localStorage.getItem(key);
        try {
            return JSON.parse(storedValue);
        } catch {
            return storedValue;
        }
    }

    removeItem(key: string) {
        this.localStorage.removeItem(key);
    }
}
