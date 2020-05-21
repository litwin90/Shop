import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    transform<T extends { [key: string]: any }>(values: T[], key: keyof T, isAsc = false): T[] {
        return [...values].sort((valueA, valueB) => (isAsc ? valueB[key] - valueA[key] : valueA[key] - valueB[key]));
    }
}
