import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductsModule } from './products/products.module';
import { LocalStorageService } from './core/services/local-storage/local-storage.service';
import { APP_CONSTANTS, APP_RANDOM_STRING_5 } from './provider-tokens';
import { ConstantsService } from './core/services/constants/constants.service';
import { GeneratorFactory, GeneratorService } from './core/services/generator/generator.service';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ProductsModule,
        LayoutModule,
        MatTabsModule,
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
