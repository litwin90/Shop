import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { IConfigOptions } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ConfigOptionsService {
    constructor(private localStorage: LocalStorageService) {}

    setOptions(options: Partial<IConfigOptions>) {
        for (const key in options) {
            if (key && options[key]) {
                this.localStorage.setItem(key, options[key]);
            }
        }
    }

    getOptions(optionsKeys: (keyof IConfigOptions)[]): Partial<IConfigOptions> {
        return optionsKeys.reduce<Partial<IConfigOptions>>(
            (options, optionKey) => {
                const storedOption = this.localStorage.getItem(optionKey);
                if (storedOption) {
                    options[optionKey] = storedOption as string;
                }
                return options;
            },
            {},
        );
    }
}
