import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { EntityStoreModule } from './entity-store.module';
import { CustomSerializer, RouterEffects, routerReducers } from './router-state';

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
        EffectsModule.forRoot([RouterEffects]),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EntityStoreModule,
    ],
})
export class RootStoreModule {}
