import { Pipe, PipeTransform } from '@angular/core';

import { dynamicSort } from '../functions/dynamic-sort'

@Pipe({ name: 'dynamicSort'})
export class DynamicSortPipe implements PipeTransform {
    transform(array: Object[], property: string) {
        const arrCopy = [...array];
        return arrCopy.sort(dynamicSort(property))
    }
}