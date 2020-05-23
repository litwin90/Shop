import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';

@NgModule({
    declarations: [AboutComponent, HomeComponent, PathNotFoundComponent],
    exports: [AboutComponent, HomeComponent, PathNotFoundComponent],
    imports: [CommonModule],
})
export class LayoutModule {}
