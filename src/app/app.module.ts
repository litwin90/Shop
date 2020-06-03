import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { LayoutModule } from './layout';
import { LocalStorageService, ConstantsService, GeneratorFactory, GeneratorService } from './core';
import { APP_CONSTANTS, APP_RANDOM_STRING_5 } from './provider-tokens';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './products';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatTabsModule,
        ProductsModule,
        /**
         * Should be last
         */
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: LocalStorageService,
            useClass: LocalStorageService,
        },
        {
            provide: APP_CONSTANTS,
            useValue: ConstantsService,
        },
        {
            provide: APP_RANDOM_STRING_5,
            useFactory: GeneratorFactory(5),
            deps: [GeneratorService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(router: Router) {
        const replacer = (key: string, value: any): string => (typeof value === 'function' ? value.name : value);
        console.log('App Routes: ', JSON.stringify(router.config, replacer, 2));
    }
}
