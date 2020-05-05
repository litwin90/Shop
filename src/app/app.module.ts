import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent, FirstComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatCardModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
