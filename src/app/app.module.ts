import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { LocalStorageService } from './core/services/local-storage/local-storage.service';
import { APP_CONSTANTS, APP_RANDOM_STRING_5 } from './provider-tokens';
import { ConstantsService } from './core/services/constants/constants.service';
import { GeneratorFactory, GeneratorService } from './core/services/generator/generator.service';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CartModule,
        ProductsModule,
        LayoutModule,
        MatTabsModule,
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
export class AppModule {}
