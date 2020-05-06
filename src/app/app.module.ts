import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CartModule } from './cart/cart.module';
import { FirstModule } from './first/first.module';
import { ProductsModule } from './products/products.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CartModule, FirstModule, ProductsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
