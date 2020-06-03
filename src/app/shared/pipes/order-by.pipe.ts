import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    transform<T extends { [key: string]: any }>(values: T[], key: keyof T, isDescOrder = true): T[] {
        const orderMultiplier = isDescOrder ? -1 : 1;

        if (values.length) {
            const fieldValueType = typeof values[0][key];

            switch (fieldValueType) {
                case 'string':
                    return [...values].sort((valueA, valueB) => (valueB > valueA ? -1 : 1) * orderMultiplier);
                case 'number':
                case 'bigint':
                case 'boolean':
                    return [...values].sort((valueA, valueB) => (valueB[key] - valueA[key]) * orderMultiplier);
                default:
                    throw new Error(`Unsupported sorting field type ${fieldValueType}`);
            }
        }
        return [];
    }
}
