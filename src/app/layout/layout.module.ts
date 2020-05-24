import { NgModule } from '@angular/core';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [AboutComponent, HomeComponent, PathNotFoundComponent],
    exports: [AboutComponent, HomeComponent, PathNotFoundComponent],
})
export class LayoutModule {}
