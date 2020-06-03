import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AboutComponent, PathNotFoundComponent } from './components';

@NgModule({
    imports: [SharedModule],
    declarations: [AboutComponent, HomeComponent, PathNotFoundComponent],
    exports: [AboutComponent, HomeComponent, PathNotFoundComponent],
})
export class LayoutModule {}
