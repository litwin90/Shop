import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ProductComponent } from './product/product.component';
import { FirstComponent } from './first/first.component';

@NgModule({
    declarations: [AppComponent, FirstComponent, ProductComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatButtonModule, MatCardModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
