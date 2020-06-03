import { Injectable } from '@angular/core';

const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Injectable({
    providedIn: 'root',
})
export class GeneratorService {
    constructor() {}

    private getRandomCharFromAlphabet(): string {
        return DEFAULT_ALPHABET.charAt(Math.floor(Math.random() * DEFAULT_ALPHABET.length));
    }

    getRandomString(length: number): string {
        return Array.from({ length })
            .map(() => {
                return this.getRandomCharFromAlphabet();
            })
            .join('');
    }
}

export function GeneratorFactory(n: number) {
    return (stringGenerator: GeneratorService): string => {
        return stringGenerator.getRandomString(n);
    };
}
