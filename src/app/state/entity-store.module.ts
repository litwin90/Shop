import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultDataServiceConfig, EntityDataModule, EntityMetadataMap } from '@ngrx/data';
import { createFeatureSelector } from '@ngrx/store';

import { environment } from '../../environments/environment';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root: environment.apiUrl,
};

// rule for json-server
const pluralNames = {
    Product: 'Product',
};

// only one entity collection User
export const entityMetadata: EntityMetadataMap = {
    Product: {},
};

// custom feature selector
export const selectEntityCacheState = createFeatureSelector('entityCache');

@NgModule({
    imports: [
        CommonModule,
        EntityDataModule.forRoot({ entityMetadata, pluralNames }),
    ],
    providers: [
        {
            provide: DefaultDataServiceConfig,
            useValue: defaultDataServiceConfig,
        },
    ],
})
export class EntityStoreModule {}
