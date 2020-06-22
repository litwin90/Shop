import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

import { ProductsStoreModule } from './products';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

import { routerReducers, CustomSerializer } from './router-state';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot(routerReducers, {
            runtimeChecks: {
                strictStateImmutability: true, // default value is true
                strictActionImmutability: true, // default value is true
                strictStateSerializability: true, // default value is false
                strictActionSerializability: true, // default value is false
                strictActionWithinNgZone: false, // default value is false
            },
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal,
            serializer: CustomSerializer, // has a priority over routerState
        }),
        EffectsModule.forRoot([]),
        ProductsStoreModule,
        // Instrumentation must be imported after importing StoreModule (config is optional)
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
})
export class RootStoreModule {}
