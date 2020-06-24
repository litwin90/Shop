import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IProduct } from '../../products/models';

@Injectable({ providedIn: 'root' })
export class ProductsService extends EntityCollectionServiceBase<IProduct> {
    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory,
    ) {
        super('Product', serviceElementsFactory);
    }
}
