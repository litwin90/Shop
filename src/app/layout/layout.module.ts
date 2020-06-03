import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AboutComponent, PathNotFoundComponent } from './components';

@NgModule({
    imports: [SharedModule],
    declarations: [AboutComponent, PathNotFoundComponent],
    exports: [AboutComponent, PathNotFoundComponent],
})
export class LayoutModule {}
